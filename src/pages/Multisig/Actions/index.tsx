
import { Formik } from 'formik';
import { Box, Button } from 'rebass';
import { Label, Input } from '@rebass/forms';

import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contractAddress, } from "config";
import { routeNames } from "routes";
import {} from "module";
import {Address, Balance, BigUIntValue, BytesValue, ContractFunction, GasLimit, SmartContract, TypedValue, U32Value} from "@elrondnetwork/erdjs";
//import ProductFormAdvanced from '../../../components/Formiker/ProductFormAdvanced';

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

  /**
   * propose to send EGLD to a receiver address
   * @param values contains the receiver address and amount
   */
  const proposeSendEgld = (values: any)  => (e: React.MouseEvent)  => {
    e.preventDefault();
    const { address, amount} = values;
    //console.log(' --- track data : ', address, amount);
    const args = [BytesValue.fromHex(new Address(address).hex()), new BigUIntValue(Balance.egld(amount).valueOf())];
    proposeAction("proposeSendEgld", args);
  }

  /**
   * 
   * @param values 
   * @returns 
   */
  const deposit = (values: any) => (e: React.MouseEvent)  => {
    e.preventDefault();
    const {amount} = values;
    proposeAction("deposit",[],Balance.egld(amount));
  }

  // eslint-disable-next-line
  const signActionById = (values: any) => (e: React.MouseEvent) => {
    e.preventDefault();
    const { actionId } = values;
    const args = [ new U32Value(actionId)];
    proposeAction("sign", args);
  }

  // eslint-disable-next-line
  const unSignActionById = (values: any) => (e: React.MouseEvent) => {
    e.preventDefault();
    const { actionId } = values;
    const args = [ new U32Value(actionId)];
    proposeAction("unsign", args);
  }

  // eslint-disable-next-line
  const performActionById = (values: any) => (e: React.MouseEvent) => {
    e.preventDefault();
    const { actionId } = values;
    const args = [ new U32Value(actionId)];
    proposeAction("performAction", args);
  }

  const validateForm = (values: any) => {
    const errors = {address:'', amount:'', actionId:''};
    // if (!values.address) {
    //   errors.address = 'Required';
    // }
    // if (!values.amount) {
    //   errors.amount = 'Required';
    // }
    return errors;
  }

  return (
     <Box
      sx={{
        maxWidth: 512,
        mx: 'auto',
        px: 3,
      }}>
     <h1>Multisig Account Management</h1>
      <Formik
      initialValues={{
        address: '',
        amount: '',
        actionId: ''
      }}
      validate={validateForm}
      onSubmit={()=>{}}
      >
          {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur
         /* and other goodies */
          }) => (
            <Box>
              <Box>
                <Label htmlFor='address'>Address</Label>
                <Input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    id='address'/>
                {errors.address && touched.address && errors.address}
              </Box>
              <Box>
                <Label htmlFor='amount'>Amount</Label>
                <Input
                    type="text"
                    name="amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    id='amount'/>
                {errors.amount && touched.amount && errors.amount}
              </Box>
              <br/>
              <Button
                href={routeNames.home}
                onClick={proposeSendEgld(values)}
                className="bg-button"
              >
                Propose-Send-EGLD
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button 
                href={routeNames.home}
                onClick={deposit(values)}
                className="bg-button"
              >
                Deposit
              </Button>

              <Box>
                <Label htmlFor='actionId'>ActionId</Label>
                <Input
                    type="text"
                    name="actionId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.actionId}
                    id='actionId'/>
                {errors.actionId && touched.actionId && errors.actionId}
              </Box>
              <br/>
              <Button
                href={routeNames.home}
                onClick={signActionById(values)}
                className="bg-button"
              >
                Sign
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                href={routeNames.home}
                onClick={unSignActionById(values)}
                className="bg-button"
              >
                UnSign
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                href={routeNames.home}
                onClick={performActionById(values)}
                className="bg-button"
              >
                Perform-Action
              </Button>

              <li>{values.address}</li>
            </Box>
          )}
    </Formik>
    </Box>
  );
};

export default Actions;
