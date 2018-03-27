#!/usr/bin/env bash

yarn javascript-obfuscator \
    testProcessor.js \
    --compact "true" \
    --controlFlowFlattening "true" \
    --controlFlowFlatteningThreshold 1 \
    --deadCodeInjection "true" \
    --deadCodeInjectionThreshold 1 \
    --disableConsoleOutput "true" \
    --log "true" \
    --mangle "false" \
    --renameGlobals "false" \
    --rotateStringArray "true" \
    --selfDefending "true" \
    --stringArray "true" \
    --stringArrayEncoding "rc4" \
    --stringArrayThreshold 1 \
    --unicodeEscapeSequence "false"
