REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
    --reporter $(REPORTER) \

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
    --reporter $(REPORTER) \
    --growl \
    --watch

cover:
	@NODE_ENV=test istanbul cover \
		./node_modules/mocha/bin/_mocha \
		--report lcovonly \
		-- -R spec \
		&& cat ./coverage/lcov.info \
		| ./node_modules/coveralls/bin/coveralls.js \
		&& rm -rf ./coverage

.PHONY: test test-w
