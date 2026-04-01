const fs = require('fs');

module.exports = {
  layout: 'layouts/page-timn-post.njk',
  contentType: 'timn',
  excludeFromFeed: false,
  eleventyComputed: {
    permalink: (data) => `/this-is-my-next/${data.page.fileSlug}/`,
    todos: (data) => {
      const todosPath = data.page.inputPath.replace(/\.md$/, '-todos.md');
      if (!fs.existsSync(todosPath)) return data.todos;

      const content = fs.readFileSync(todosPath, 'utf-8');
      const lines = content.split('\n');
      const todos = [];
      let current = null;

      for (const line of lines) {
        const topMatch = line.match(/^- \[(x| )\] (.+)/);
        const subMatch = line.match(/^\s+- \[(x| )\] (.+)/);

        if (topMatch) {
          current = { text: topMatch[2].trim(), done: topMatch[1] === 'x' };
          todos.push(current);
        } else if (subMatch && current) {
          if (!current.subtasks) current.subtasks = [];
          current.subtasks.push({ text: subMatch[2].trim(), done: subMatch[1] === 'x' });
        }
      }

      return todos.length > 0 ? todos : data.todos;
    },
  },
};
