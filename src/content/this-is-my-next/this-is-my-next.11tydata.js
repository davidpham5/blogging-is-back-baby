const fs = require('fs');

module.exports = {
  layout: 'layouts/page-timn-post.njk',
  contentType: 'timn',
  excludeFromFeed: false,
  eleventyComputed: {
    permalink: (data) => `/this-is-my-next/${data.page.fileSlug}/`,
    todos: async (data) => {
      // Convention: look for {fileSlug}-todos.md next to the post (.md only)
      const todosPath = data.page.inputPath.replace(/\.md$/, '-todos.md');

      try {
        await fs.promises.access(todosPath);
      } catch {
        return data.todos;
      }

      const content = await fs.promises.readFile(todosPath, 'utf-8');
      const lines = content.split('\n');
      const todos = [];
      let current = null;

      for (const line of lines) {
        const topMatch = line.match(/^- \[(x|X| )\] (.+)/);
        const subMatch = line.match(/^\s+- \[(x|X| )\] (.+)/);

        if (topMatch) {
          current = { text: topMatch[2].trim(), done: topMatch[1] !== ' ' };
          todos.push(current);
        } else if (subMatch && current) {
          if (!current.subtasks) current.subtasks = [];
          current.subtasks.push({ text: subMatch[2].trim(), done: subMatch[1] !== ' ' });
        }
      }

      return todos.length > 0 ? todos : data.todos;
    },
  },
};
