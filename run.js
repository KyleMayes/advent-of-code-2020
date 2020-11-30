const { main } = require("ts-node/dist/bin");
const { resolve } = require("path");

const path = resolve(__dirname, "source", `day${process.argv[2]}.ts`);
console.log(`Executing ${path}...`);
main([path]);
