import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = "transaction";

async function transfer(fromAccount, toAccount, amount, remark) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    const sender = await db
      .collection("accounts")
      .findOne({ account_number: fromAccount });
    const receiver = await db
      .collection("accounts")
      .findOne({ account_number: toAccount });

    if (!sender || !receiver) {
      console.error("Sender or receiver account not found");
      return;
    }

    if (sender.balance < amount) {
      console.error("Insufficient balance");
      return;
    }

    const senderNextChangeNumber = sender.account_changes.length + 1;
    const receiverNextChangeNumber = receiver.account_changes.length + 1;

    const senderChange = {
      change_number: senderNextChangeNumber,
      amount: -amount,
      changed_date: new Date(),
      remark: remark,
    };
    sender.balance -= amount;
    sender.account_changes.push(senderChange);

    const receiverChange = {
      change_number: receiverNextChangeNumber,
      amount: amount,
      changed_date: new Date(),
      remark: remark,
    };
    receiver.balance += amount;
    receiver.account_changes.push(receiverChange);

    await db
      .collection("accounts")
      .updateOne({ account_number: fromAccount }, { $set: sender });
    await db
      .collection("accounts")
      .updateOne({ account_number: toAccount }, { $set: receiver });

    console.log(
      `Transferred ${amount} from account ${fromAccount} to account ${toAccount}`
    );
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
    console.log("Connection to MongoDB closed");
  }
}

export default transfer;
