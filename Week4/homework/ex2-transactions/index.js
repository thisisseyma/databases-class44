import setup from "./setup.js";
import transfer from "./transfer.js";

async function main() {
  await setup();

  const fromAccount = 101;
  const toAccount = 102;
  const amount = 1000;
  const remark = "Transfer to account " + toAccount;

  await transfer(fromAccount, toAccount, amount, remark);
}

main().catch((err) => {
  console.error("An error occurred:", err);
});
