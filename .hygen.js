module.exports = {
  templates: {
    "react-component": {
      description:
        "Create a new React component with TypeScript and SCSS files",
      prompts: [
        {
          type: "input",
          name: "name",
          message: "Component name?",
        },
      ],
      actions: [
        {
          type: "add",
          path: "src/components/{{ camelCase name }}/{{ camelCase name }}.tsx",
          templateFile: "templates/component/component.tsx.ejs",
        },
        {
          type: "add",
          path: "src/components/{{ camelCase name }}/{{ camelCase name }}.module.scss",
          templateFile: "templates/component/component.module.scss.ejs",
        },
        {
          type: "add",
          path: "src/components/{{ camelCase name }}/{{ camelCase name }}.interface.ts",
          templateFile: "templates/component/component.interface.ts.ejs",
        },
      ],
    },
  },
};
