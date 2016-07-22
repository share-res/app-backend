#!/usr/bin/env node

var program = require('commander');
program
  .version('0.2.1')
  .option('-p, --port <n>', 'listen port',parseInt)
  .option('-d, --debug', 'DEBUG pattern');


program.command('initdb')
  .description('run initdb command')
  .action(async (cmd)=>{
    debug('begin init db......');
    await require('./util/mockdata')();
    debug('init db finished!');
  });

program.command('api')
  .description('api serve')
  .action(async (cmd)=>{
    debug('begin init db......');
    await require('./util/mockdata')();
    debug('init db finished!');
  });
  
program.parse(process.argv);
if (!program.port) program.port=3000

console.log('port : %j',program.port);
