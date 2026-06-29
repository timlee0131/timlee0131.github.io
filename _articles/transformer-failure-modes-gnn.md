---
layout: article
title: "Understanding the Failure Modes of Transformers through the Lens of Graph Neural Networks"
date: 2025-12-09
venue: arXiv
description: A study of transformer failure modes through graph neural network theory, framing deep learning as learnable information propagation and bottlenecks.
external_url: https://arxiv.org/abs/2512.09182
external_label: read full article
---

**Abstract.** Transformers and more specifically decoder-only transformers
dominate modern LLM architectures. While they have shown to work exceptionally
well, they are not without issues, resulting in surprising failure modes and
predictably asymmetric performance degradation. This article is a study of many
of these observed failure modes of transformers through the lens of graph neural
network (GNN) theory. We first make the case that much of deep learning,
including transformers, is about learnable information mixing and propagation.
This makes the study of model failure modes a study of bottlenecks in information
propagation. This naturally leads to GNN theory, where there is already a rich
literature on information propagation bottlenecks and theoretical failure modes
of models. We then make the case that many issues faced by GNNs are also
experienced by transformers. In addition, we analyze how the causal nature of
decoder-only transformers create interesting geometric properties in information
propagation, resulting in predictable and potentially devastating failure modes.
Finally, we observe that existing solutions in transformer research tend to be
ad-hoc and driven by intuition rather than grounded theoretical motivation. As
such, we unify many such solutions under a more theoretical perspective,
providing insight into why they work, what problem they are actually solving, and
how they can be further improved to target specific failure modes of
transformers. Overall, this article is an attempt to bridge the gap between
observed failure modes in transformers and a general lack of theoretical
understanding of them in this space.
