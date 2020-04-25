import { exec } from 'child_process';


export function download(args: string[]) {
	console.log("command.ts: Downloads Starting!")
  let command = 'electron\\test.exe';
  args.forEach((element) => {
    command += ' ' + element;
	});
	console.log("command.ts: ", command)
	
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}