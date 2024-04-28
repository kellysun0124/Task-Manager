module.exports = {
  apps : [{
    name: 'Angular App',
    script: 'ng',
    args: 'serve --host 0.0.0.0 --disable-host-check',
    watch: true,
    env: {
      "PORT": 4200,
      "NODE_ENV": "development"
    }
  },{
    name: 'Node Server',
    script: 'server.js',
    watch: true,
    env: {
      "PORT": 3000,
      "NODE_ENV": "development"
    }
  }]
};
