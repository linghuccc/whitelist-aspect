#!/bin/bash

NODE_URL="https://betanet-rpc1.artela.network"
TX_HASH="0x0c7a175dd652aa50f0d97cf19206278f2f6e2e2498d5ca05fa4f2febc15690f2"

TX_DETAILS=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["'"$TX_HASH"'"],"id":1}' \
  ${NODE_URL})

TO=$(echo $TX_DETAILS | jq -r '.result.to')
INPUT=$(echo $TX_DETAILS | jq -r '.result.input')
FROM=$(echo $TX_DETAILS | jq -r '.result.from')
GAS=$(echo $TX_DETAILS | jq -r '.result.gas')
GAS_PRICE=$(echo $TX_DETAILS | jq -r '.result.gasPrice')
VALUE=$(echo $TX_DETAILS | jq -r '.result.value')
DATA='{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"'"$TO"'","data":"'"$INPUT"'","from":"'"$FROM"'","gas":"'"$GAS"'","gasPrice":"'"$GAS_PRICE"'","value":"'"$VALUE"'"}, "latest"],"id":1}'

CALL_RESULT=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  --data "${DATA}" \
  ${NODE_URL})

echo "Transaction replay result: $CALL_RESULT"