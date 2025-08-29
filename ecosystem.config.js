module.exports = {
  apps: [
    {
      name: 'admin.qujochoe.org',
      cwd: '/var/www/admin.qujochoe.org',
      script: 'npm',
      args: 'run deploy-studio',
    },
  ],
};