REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--recursive \
    --reporter $(REPORTER) \

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--recursive \
    --reporter $(REPORTER) \
    --growl \
    --watch

cover:
	@NODE_ENV=test istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -R spec \
		--recursive \
		&& cat ./coverage/lcov.info \
		| ./node_modules/coveralls/bin/coveralls.js \
		&& rm -rf ./coverage

.PHONY: test test-w
