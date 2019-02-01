#!/bin/sh -x

psql -U postgres -h 127.0.0.1 -c 'DROP DATABASE IF EXISTS koa_api;'
psql -U postgres -h 127.0.0.1 -c 'CREATE DATABASE koa_api;'
knex migrate:latest
knex seed:run