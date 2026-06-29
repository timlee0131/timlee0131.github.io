---
layout: page
permalink: /articles/
title: articles
nav: true
nav_order: 2
description: My technical writing outside of peer-reviewed publication.
---

<div class="articles">
  {% assign sorted_articles = site.articles | sort: 'date' | reverse %}
  {% for article in sorted_articles %}
    <div class="article-entry mb-4">
      <h3 class="mb-0">
        {% if article.external_url %}
          <a href="{{ article.url | relative_url }}">{{ article.title }}</a>
          <!-- <span class="badge badge-secondary align-middle ml-1">external</span> -->
        {% else %}
          <a href="{{ article.url | relative_url }}">{{ article.title }}</a>
        {% endif %}
      </h3>
      <p class="post-meta mb-1">
        {% if article.date %}{{ article.date | date: '%B %-d, %Y' }}{% endif %}
        {% if article.venue %} &middot; {{ article.venue }}{% endif %}
      </p>
      {% if article.description %}
        <p class="mb-0">{{ article.description }}</p>
      {% endif %}
    </div>
  {% endfor %}
</div>
