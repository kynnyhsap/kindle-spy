const p= Deno.run({
  cmd: ["deno", "run", "-A", "spy.ts"],
  stdout: "piped",
  stderr: "piped",
});

console.log(`Spawned SPY Kindle process ${p.pid}`);

const { code } = await p.status();

// Reading the outputs closes their pipes
const rawOutput = await p.output();
const rawError = await p.stderrOutput();

if (code === 0) {
  await Deno.stdout.write(rawOutput);
} else {
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
