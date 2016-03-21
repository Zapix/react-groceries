#!/usr/bin/env bash
npm run lint
RESULT=$?
[ $RESULT -ne 0 ] && exit 1
npm test
RESULT=$?
[ $RESULT -ne 0 ] && exit 1
exit 0;