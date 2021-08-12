import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contractAddress } from "config";
import { routeNames } from "routes";
import {} from "module";
import {Address, BytesValue, ContractFunction, GasLimit, SmartContract, TypedValue, U32Value} from "@elrondnetwork/erdjs";


const Actions = () => {
  const sendTransaction = Dapp.useSendTransaction();
  const { chainId } = Dapp.useContext();

  let contract = new SmartContract({ address: new Address(contractAddress)});

  const proposeAction = (action: string, args?: TypedValue[]) => {
    const transaction = contract.call({
      func: new ContractFunction(action),
      args,
      gasLimit: new GasLimit(100000000)
    });

    sendTransaction({
      transaction,
      callbackRoute: routeNames.transaction,
    });
  };

  const proposeSendEgld = (address: string, amount: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(' --- track data : ', address, amount);
    const args = [BytesValue.fromHex(new Address(address).hex()), new U32Value(amount)];
    proposeAction("proposeSendEgld", args);
  }

  const signActionById = (actionId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const args = [ new U32Value(actionId)];
    proposeAction("sign", args);
  }

  const unSignActionById = (actionId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const args = [ new U32Value(actionId)];
    proposeAction("unsign", args);
  }

  const performActionById = (actionId: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const args = [ new U32Value(actionId)];
    proposeAction("performAction", args);
  }

  var erd_address = 'erd17pupr269rd980g0p.....y69strr5up';
  var amount = 3.5;


  return (
    <div className="d-flex mt-4 justify-content-center">
      <div className="action-btn">
        <input type="text" placeholder="Put the address here..."
         defaultValue="" 
         onChange={(event)=>{erd_address = event.target.value}} />
        <button className="btn" onClick={proposeSendEgld(erd_address,amount.valueOf())}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a
          href={routeNames.home}
          onClick={proposeSendEgld(erd_address,amount.valueOf())}
          className="text-white text-decoration-none"
        >
          Stake
        </a>
      </div>
    </div>
  );
};

export default Actions;
