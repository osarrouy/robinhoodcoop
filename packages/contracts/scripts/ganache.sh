#!/usr/bin/env bash

# exit script as soon as a command fails
set -o errexit

# execute cleanup function at script exit
trap cleanup EXIT

# set ganache port
ganache_port=8545

cleanup() {
  # kill the ganache instance that we started [if we started one and if it's still running]
  if [ -n "$ganache_pid" ] && ps -p $ganache_pid > /dev/null; then
    kill -9 $ganache_pid
  fi
}

ganache_running() {
  nc -z localhost "$ganache_port" > /dev/null 2>&1
}

start_ganache() {
  node_modules/.bin/ganache-cli --gasLimit 99900000  --port "$ganache_port" -m "fetch local valve black attend double eye excite planet primary install allow" > /dev/null &

  ganache_pid=$!

  echo -n "[+] starting ganache on port "$ganache_port"..."

  while ! ganache_running; do
    sleep 0.1
  done

  printf "\b\b\b \e[32mOK\e[0m\n"
}

if ganache_running; then
  echo "[+] ganache already started on port "$ganache_port
else
  start_ganache
fi

echo ""
node_modules/.bin/truffle test