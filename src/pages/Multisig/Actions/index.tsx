import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contractAddress, } from "config";
import { routeNames } from "routes";
import {} from "module";
import {Address, Balance, BigUIntValue, BytesValue, ContractFunction, GasLimit, SmartContract, TypedValue, U32Value} from "@elrondnetwork/erdjs";


const Actions = () => {
  const sendTransaction = Dapp.useSendTransaction();
  const { chainId } = Dapp.useContext();

  let contract = new SmartContract({ address: new Address(contractAddress)});

  const proposeAction = (action: string, args?: TypedValue[], value?:Balance) => {
    const transaction = contract.call({
      func: new ContractFunction(action),
      args,
      value,
      gasLimit: new GasLimit(50000000)
    });

    sendTransaction({
      transaction,
      callbackRoute: routeNames.transaction,
    });
  };

  const proposeSendEgld = (address: string, amount: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(' --- track data : ', address, amount);
    const args = [BytesValue.fromHex(new Address(address).hex()), new BigUIntValue(Balance.egld(amount).valueOf())];
    proposeAction("proposeSendEgld", args);
  }

  const deposit = (value:number) => (e: React.MouseEvent) => {
    e.preventDefault();
    proposeAction("deposit",[],Balance.egld(value));
  }

  // eslint-disable-next-line
  const signActionById = (actionId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const args = [ new U32Value(actionId)];
    proposeAction("sign", args);
  }

  // eslint-disable-next-line
  const unSignActionById = (actionId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const args = [ new U32Value(actionId)];
    proposeAction("unsign", args);
  }

  // eslint-disable-next-line
  const performActionById = (actionId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const args = [ new U32Value(actionId)];
    proposeAction("performAction", args);
  }

  const [address, setAddres]  = React.useState(""); //'erd17*upr269rd980g0pu7f7xhdmswyr7hxhds8yt8dm7pg903pyy69strr5u*';
  const [amount, setAmount] = React.useState("");;
  const [actionId, setActionId] = React.useState("");;


  const handleChangeAddress = (e: { target: { value: React.SetStateAction<string>; }; }) => setAddres(e.target.value);
  const handleChangeAmount = (e: { target: { value: React.SetStateAction<string>; }; }) => setAmount(e.target.value);
  const handleChangeActionId = (e: { target: { value: React.SetStateAction<string>; }; }) => setActionId(e.target.value);


  return (
    <div className="d-flex mt-4 justify-content-center">
      <div className="action-btn">
        Address <input type="text" placeholder="Put the address here..."
          value={address}
          onChange={handleChangeAddress} />

          Amount <input type="text" placeholder="Amount here..."
          value={amount}
          onChange={handleChangeAmount} />

          ActionID <input type="text" placeholder="Action here..."
          value={actionId}
          onChange={handleChangeActionId} />

        <button className="btn" onClick={proposeSendEgld(address,+amount)}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a
          href={routeNames.home}
          onClick={proposeSendEgld(address,+amount)}
          className="text-white text-decoration-none"
        >
          Propose
        </a>

        <a
          href={routeNames.home}
          onClick={deposit(+amount)}
          className="text-white text-decoration-none"
        >
          Deposit
        </a>

        <a
          href={routeNames.home}
          onClick={signActionById(+actionId)}
          className="text-white text-decoration-none"
        >
          <b>Sign action with id {actionId||'not assigned'}</b>
        </a>
      
        <a
          href={routeNames.home}
          onClick={performActionById(+actionId)}
          className="text-white text-decoration-none"
        >
          <b>Perform action with id {actionId||'not assigned'}</b>
        </a>
      </div>
    </div>
  );
};

export default Actions;
