const { parseFrontmatter } = require('./utils')

describe('processFrontmatter', () => {
  it('should parse a title with quotes', () => {
    const frontMatter = ```
---
title: 'Part 6 - Advanced Techniques'
slug: '/part-6-advanced-techniques/'
---
    ```
    const fm = parseFrontmatter(frontMatter)
    expect(fm.title).toEqual('Part 6 - Advanced Techniques')
  })
});

