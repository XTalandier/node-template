MOCHA_REPORTER = spec
UNIT_TESTS = $(shell find test/ -name "*.test.js")


all: spec cucumber

run:
	clear
	@NODE_ENV=development node server.js

spec:
	clear
	@NODE_ENV=test sequelize -m
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--require sinon \
		--globals prop \
		--reporter $(MOCHA_REPORTER) \
		--slow 50 \
		--growl \
		test/init.js $(UNIT_TESTS)

cucumber:
	@NODE_ENV=test ./node_modules/.bin/cucumber.js test/features \
		-r test/features/step_definitions


.PHONY: spec cucumber