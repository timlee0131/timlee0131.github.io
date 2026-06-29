---
layout: article
title: "Static and Dynamic Attention: Implications for Graph Neural Networks"
date: 2025-01-11
venue: Towards Data Science · Medium
description: How GAT and GATv2 differ in their attention formulations — static vs. dynamic attention — and why it changes their theoretical expressive capacity.
external_url: https://medium.com/data-science/static-and-dynamic-attention-implications-for-graph-neural-networks-eda0d9d7b60a
external_label: read on Medium
toc:
  sidebar: left
---

![Static and dynamic attention in graph neural networks](/assets/img/articles/static-dynamic-attention-header.png)

In graph representation learning, neighborhood aggregation is one of the most well-studied and investigated areas, among which attention-based methods largely remain state-of-the-art. Leveraging learnable attention scores for weighted aggregations, graph attention networks exhibit higher expressivity than naive aggregation schemes. In graph attention, the most well known and used schemes are from *Graph Attention Networks* (GAT) [1] and *How Attentive are Graph Attention Networks* (GATv2) [2]. GAT and GATv2 both leverage attention for weighted neighborhood aggregation, but differ in how they employ attention scores, resulting in differing levels of theoretical expressivity. The chief purpose of this article is to explore exactly how GAT and GATv2 differ in their formulations and why it results in different levels of expressive capacity.

## Graph Attention Network (GAT)

Graph Attention Network (GAT), as introduced in [1], closely follows the work from [3] in its attention setup. The GAT formulation also holds many similarities to the now infamous transformer paper [4], with both papers having been published months away from each other.

Attention in graphs is used to *rank* or *weigh* the relative importance of every neighboring node (keys) with respect to each source node (query). These attention scores are calculated for every node feature in the graph and its respective neighbors. Node features, denoted by $\mathbf{H} \in \\{h_1, h_2,..., h_N\\}, \; h_i \in \mathbb{R}^d$, go through a linear transformation with a weight matrix denoted $\mathbf{W} \in \mathbb{R}^{d \times d'}$ before the attention mechanism is applied. With linearly transformed node features, the raw attention score is calculated using a single-layer feedforward neural network parameterized by $\mathbf{a}$ followed by a LeakyReLU non-linearity. The $\Vert$ symbol denotes concatenation along the feature dimension.

$$
e_{ij} = \operatorname{LeakyReLU}\!\left(\mathbf{a}^\top \left[\mathbf{W}\mathbf{h}_i \,\Vert\, \mathbf{W}\mathbf{h}_j\right]\right)
$$

These raw scores are then normalized across the neighborhood $\mathcal{N}_i$ of node $i$ with a softmax:

$$
\alpha_{ij} = \operatorname{softmax}_j(e_{ij}) = \frac{\exp(e_{ij})}{\sum_{j \in \mathcal{N}_i} \exp(e_{ij})}
$$

*Note: the multi-head attention formulation is intentionally skipped in this article as it holds no relevance to the attention formulation itself. Both GAT and GATv2 leverage multi-headed attention in their implementations.*

$$
a \in \mathbb{R}^{2d'}, \; \sigma(\cdot)
$$

$$
e_{ij} = \sigma(a^T[Wh_i || Wh_j]), \; \forall j \in \mathcal{N}_i
$$

As can be seen, the learnable attention parameter $\mathbf{a}$ is introduced as a linear combination of the transformed node features $\mathbf{W}\mathbf{h}$. As elaborated in the upcoming sections, this setup is known as *static attention* and is the main limiting factor of GAT, though for reasons that are not immediately obvious.

## Static Attention

Consider a graph where node $\mathbf{h}_1$ is the query node with the following neighbors (keys) $\{\mathbf{h}_2, \mathbf{h}_3, \mathbf{h}_4, \mathbf{h}_5\}$.

Calculating the raw attention score between the query node and $\mathbf{h}_2$ following the GAT formulation shows that the learnable attention parameter $\mathbf{a}$ is combined linearly with the concatenated query and key nodes. This means that the contributions of $\mathbf{a}$ with respect to $\mathbf{W}\mathbf{h}_1$ and $\mathbf{W}\mathbf{h}_2$ are *linearly separable* as $\mathbf{a} = [\mathbf{a}_1 \,\Vert\, \mathbf{a}_2]$:

$$
e_{12} = \operatorname{LeakyReLU}\!\left(\mathbf{a}^\top [\mathbf{W}\mathbf{h}_1 \,\Vert\, \mathbf{W}\mathbf{h}_2]\right) = \operatorname{LeakyReLU}\!\left(\mathbf{a}_1^\top \mathbf{W}\mathbf{h}_1 + \mathbf{a}_2^\top \mathbf{W}\mathbf{h}_2\right)
$$

Calculating the raw attention scores for the rest of the neighborhood with respect to the query node $\mathbf{h}_1$, a pattern begins to emerge:

$$
\begin{aligned}
e_{12} &= \operatorname{LeakyReLU}\!\left(\mathbf{a}_1^\top \mathbf{W}\mathbf{h}_1 + \mathbf{a}_2^\top \mathbf{W}\mathbf{h}_2\right)\\[2pt]
e_{13} &= \operatorname{LeakyReLU}\!\left(\mathbf{a}_1^\top \mathbf{W}\mathbf{h}_1 + \mathbf{a}_2^\top \mathbf{W}\mathbf{h}_3\right)\\[2pt]
e_{14} &= \operatorname{LeakyReLU}\!\left(\mathbf{a}_1^\top \mathbf{W}\mathbf{h}_1 + \mathbf{a}_2^\top \mathbf{W}\mathbf{h}_4\right)\\[2pt]
e_{15} &= \operatorname{LeakyReLU}\!\left(\mathbf{a}_1^\top \mathbf{W}\mathbf{h}_1 + \mathbf{a}_2^\top \mathbf{W}\mathbf{h}_5\right)
\end{aligned}
$$

The query term $\mathbf{a}_1^\top \mathbf{W}\mathbf{h}_1$ is repeated each time in the calculation of the attention scores. This means that while the query term is technically included in the attention calculation, it essentially affects all neighbors equally and does not affect their relative ordering. Only the key terms determine the relative order of attention scores with respect to each other.

This type of attention is called *static attention* by [2]. This design means that the ranking of neighbors' importance is determined globally across all nodes independent of the specific query nodes. This limitation prevents GAT from capturing locally nuanced relationships where different nodes might prioritize different subsets of neighbors. As stated in [2], the mechanism "cannot model situations where different keys have different relevance to different queries."

## Dynamic Attention and GATv2

The authors of GATv2 make the observation that the application of consecutive, linear operations on $\mathbf{W}$ and $\mathbf{a}$ can be collapsed into a single linear layer. Indeed, the attention scores being unconditioned on the query terms is a byproduct of such linear operations between $\mathbf{W}$, $\mathbf{h}$, and $\mathbf{a}$. To overcome such limitations of static attention, GATv2 introduces what they call *dynamic attention*, which removes the above-mentioned linearity constraint and makes attention scores conditional on their query nodes, allowing for a strictly more expressive attention mechanism.

Dynamic attention is achieved with a simple change in the order of operations in GAT's attention calculation process. This simple change essentially amounts to applying the non-linearity to the query and key terms *before* introducing the $\mathbf{a}$ layer:

$$
e_{ij} = \mathbf{a}^\top \operatorname{LeakyReLU}\!\left(\mathbf{W} [\mathbf{h}_i \,\Vert\, \mathbf{h}_j]\right)
$$

While simple and intuitive, this tweak in the order of operations means that the query and key terms are no longer linearly separable. It also means that when the attention mechanism is applied, both the query and key terms interact with $\mathbf{a}$ in a way that allows attention scores to be conditioned on both the query and its neighbors. As simple as this change may look, it represents a deep idea in attention mechanisms and makes significant progress in the theoretical expressive capacity that graph attention can introduce to a problem.

## Final Thoughts

While GATv2 undoubtedly makes significant progress over GAT in their use of the attention mechanism, such progress is largely theoretical. While the authors of GATv2 do devise benchmark scenarios that clearly illustrate the expressive power of dynamic attention and the shortcomings of static attention, GAT still shows competitive performance in many existing real-world problems and datasets. In fact, GATv2 only shows very marginal improvements in performance against GAT in nearly all of the real-world datasets used in their experimentation (including in various OGB datasets and the QM9 dataset).

The juxtaposition between GATv2's significant theoretical advancement and its marginal empirical improvement can be due to several factors. One, conditioned on the query or not, the attention mechanism has been shown to be very effective and can present stable and powerful performance, especially under multi-headed settings. Two, the scenarios that would most benefit from GATv2's dynamic attention formulation may not arise all that much in real-world graphs. GATv2's dynamic attention would be most beneficial in graphs exhibiting complex local interactions between nodes, requiring different nodes to have distinctly different rankings of (possibly) shared neighbors. It may be the case that such graphs are simply not common or realistic. In homophilic graphs, for example, keys that rank highly according to a particular query may very well be of global importance and likely of high importance among other local queries. In addition, real-world graphs can often be sparse with relatively low average degrees. With such graphs, the benefits of dynamic attention may be less pronounced because there are fewer neighbors to rank dynamically.

Overall, both GAT and GATv2 are among the most versatile, powerful, and practically used operations in graph representation learning. The article highlights two key takeaways:

1. Despite the name "v2", GATv2 is more than just an iterative update or optimization of GAT and offers real theoretical improvements over its predecessor.
2. Not only has GAT been incredibly influential since its introduction in 2018, it still remains one of the most powerful tools available in graph representation learning.

## References

[1] Petar Veličković, Guillem Cucurull, Arantxa Casanova, Adriana Romero, Pietro Liò, and Yoshua Bengio. *Graph Attention Networks.* arXiv preprint [arXiv:1710.10903](https://arxiv.org/abs/1710.10903), 2017.

[2] Shaked Brody, Uri Alon, and Eran Yahav. *How Attentive are Graph Attention Networks?* arXiv preprint [arXiv:2105.14491](https://arxiv.org/abs/2105.14491), 2021.

[3] Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. *Neural Machine Translation by Jointly Learning to Align and Translate.* arXiv preprint [arXiv:1409.0473](https://arxiv.org/abs/1409.0473), 2014.

[4] Ashish Vaswani et al. *Attention Is All You Need.* Advances in Neural Information Processing Systems, 2017.
