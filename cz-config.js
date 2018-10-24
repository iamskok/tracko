'use strict';

module.exports = {
	types: [
		{ value: 'feat',     name: '✨ FEATURE: a new feature' },
		{ value: 'fix',      name: '🐛 FIX: a bug fix' },
		{ value: 'chore',    name: '🔧 CHORE: changes to the build process or auxiliary tools\n and libraries such as documentation generation' },
		{ value: 'docs',     name: '📝 DOCS: documentation only changes' },
		{ value: 'style',    name: '🎨 STYLE: changes that do not affect the meaning of the code\n (white-space, formatting, missing semi-colons, etc) '},
		{ value: 'refactor', name: '👷‍♂️ REFACTOR: a code change that neither fixes a bug nor adds a feature' },
		{ value: 'perf',     name: '⚡️ PERFORMANCE: code change that improves performance' },
		{ value: 'test',     name: '✅ TEST: adding missing tests or correcting existing tests' }
	],

	scopes: [
		{ name: 'git' },
		{ name: 'build' },
		{ name: 'ui' },
		{ name: 'model' },
		{ name: 'controller' },
		{ name: 'view' },
		{ name: 'service' }
	],

	messages: {
		type:          'ℹ️ Select the type of change that you\'re committing:',
		scope:         '\n ⤴️ Denote the SCOPE of this change (optional):',
		customScope:   '❔Denote the SCOPE of this change:',
		subject:       '✏️ Write a SHORT, IMPERATIVE tense description of the change:\n',
		body:          '📚 Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
		breaking:      '💥 List any BREAKING CHANGES (optional):\n',
		footer:        '📌 List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit: '☑️ Are you sure you want to proceed with the commit above?'
	},

	allowCustomScopes: true,
	allowBreakingChanges: ['feat', 'fix'],
	subjectLimit: 72
};