import {
	UserConfig,
	TargetCaseType,
	RuleConfigSeverity,
} from '@commitlint/types';

// CONFIGURE: https://commitlint.js.org/#/reference-configuration

/**
 * https://gist.github.com/develar/273e2eb938792cf5f86451fbac2bcd51
 *
 * ---
 *
 * Commit anatomy:
 *
 * ```text
 * <type>(<scope>): <subject>
 * <BLANK LINE>
 * <body>
 * <BLANK LINE>
 * <footer>
 * ```
 *
 * ---
 *
 * Example:
 *
 * ```text
 * feature: adding queues in pending streaming messages
 *
 * - new lib dependencie fastq
 * - threating every messages with type ":new:"
 * - queued saving in s3 storage in case service
 * was going down
 *
 * Issue: #1234
 * ```
 *
 * ---
 *
 * Project example:
 *
 * ```text
 * feat(#123,#321,#456): subject
 *
 * - body content
 * ```
 */

// TODO: can we do translation with i18n ?

const MAX_LENGTH = 80;
const { Disabled, Warning, Error } = RuleConfigSeverity;

enum CommitTypes {
	FEAT = 'feature',
	FIX = 'fix',
	REF = 'refactor',
	DOCS = 'docs',
	CHORE = 'chore',
	BUG = 'bug',
	VER = 'version',
	REV = 'revert',
}

const COMMIT_TYPES: CommitTypes[] = Object.values(CommitTypes);
const COMMIT_NEVER_CASES: TargetCaseType[] = [
	'sentence-case',
	'start-case',
	'pascal-case',
	'upper-case',
];

/**
 * https://commitlint.js.org/#/reference-rules
 */

const BODY_DESCRIPTION = `
Body da Alteração (opcional), atente-se a utilizar o body com alterações importantes
adicionando descrições relevantes. Deve ser separado por tópicos com textos não extensos para fácil leitura e não tão detalhados.

---

SIGA O PADRÃO DE EXEMPLO:

- new dependencie lib fastq
- threating every messages with type ":new:"
- queued saving in s3 storage in case service
was going down
- new structure prepared for clean arch/code
- saving stages from form in db to get back
when needed
\n
`;

const config: UserConfig = {
	/*
	 * Resolve and load a custom linter
	 */
	extends: ['@commitlint/cz-commitlint'], // prompt dependencie
	/*
	 * Resolve and load conventional-changelog-atom from node_modules.
	 * Referenced packages must be installed
	 */
	// parserPreset: '',
	/*
	 * Resolve and load @commitlint/format from node_modules.
	 * Referenced package must be installed
	 */
	formatter: '@commitlint/format',
	/*
	 * Any rules defined here will override rules from @commitlint/config-conventional
	 */
	rules: {
		// type: feat, fix, docs, etc..
		'type-empty': [Error, 'never'],
		'type-enum': [Error, 'always', COMMIT_TYPES],
		'type-case': [Error, 'always', 'lower-case'],

		// scope: feat(#scope):
		'scope-empty': [Error, 'never'],
		'scope-min-length': [Error, 'always', 2],

		// subject: feat(#scope): subject
		'subject-empty': [Error, 'never'],
		'subject-case': [Error, 'never', COMMIT_NEVER_CASES],
		'subject-max-length': [Error, 'always', MAX_LENGTH],

		// header: feat(#scope): content  <- ALL LENGTH
		'header-max-length': [Error, 'always', MAX_LENGTH],
		'header-case': [Error, 'always', ['lower-case']],

		// body, optional
		'body-leading-blank': [Warning, 'always'],
		'body-max-line-length': [Error, 'always', MAX_LENGTH],
		'body-empty': [Error, 'never'],
		'body-max-length': [Disabled, 'always', Infinity],

		// footer, optional
		'footer-empty': [Warning, 'never'],
		'footer-leading-blank': [Warning, 'always'],
		'footer-max-line-length': [Error, 'always', MAX_LENGTH],
	},
	/*
	 * Arry of Functions that return true if commitlint should ignore the given message.
	 */
	// ignores: [(commit) => commit === ''],
	/*
	 * Whether commitlint uses the default ignore rules.
	 */
	//defaultIgnores: true,
	/*
	 * Custom URL to show upon failure
	 */
	// helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
	helpUrl: './docs/commit-linter.md',
	/*
	 * Custom prompt configs
	 */
	prompt: {
		settings: {
			enableMultipleScopes: true,
			scopeEnumSeparator: ',', // multiple scope delimiter
		},
		messages: {
			skip: ':skip',
			max: 'Acima %d caracteres',
			min: 'Abaixo de %d caracteres',
			emptyWarning: 'Commits em branco serão rejeitados',
			upperLimitWarning: 'Acima do limite de caracteres permitido',
			lowerLimitWarning: 'Abaixo do limite de caracteres permitido',
		},
		questions: {
			type: {
				description: 'Selecione o tipo do commit: ',
				enum: {
					[CommitTypes.FEAT]: {
						description: 'Uma nova funcionalidade',
						title: 'Feature',
						emoji: '🚀',
					},
					[CommitTypes.FIX]: {
						description:
							'Correção de código que não corresponde a um bug de funcionalidade',
						title: 'Correção do código (não funcional)',
						emoji: '✅',
					},
					[CommitTypes.CHORE]: {
						description:
							'Alteração sem importância como acentos, virgulas, coisas não tão relevantes ao código e etc.',
						title: 'Chore, alteração não relevante',
						emoji: '❓',
					},
					[CommitTypes.REF]: {
						description: 'Refatoração do código em pequena ou larga escala',
						title: 'Refactor',
						emoji: '🛠',
					},
					[CommitTypes.BUG]: {
						description:
							'Correção de um bug importante ou funcionalidade da aplicação',
						title: 'Correção do código (funcional)',
						emoji: '🐛',
					},
					[CommitTypes.DOCS]: {
						description:
							'Documentação no geral, ajustes, novas documentações, etc.',
						title: 'Documentation',
						emoji: '📚',
					},
					[CommitTypes.VER]: {
						description: 'Único intúito de atualização da versão do projeto',
						title: 'Version',
						emoji: '🔝',
					},
					[CommitTypes.REV]: {
						description:
							'Único intúito realizar o revert/rollback de algo no sistema',
						title: 'Revert',
						emoji: '🔙',
					},
				},
			},
			header: {
				description:
					'Titulo da mensagem, utilizado para exibição, changelog, facil reconhecimento, etc.',
			},
			scope: {
				description: 'Escopo da mudança, ex: #123,#456',
			},
			subject: {
				description:
					'Mensagem resumida da alteração, utilizado como titulo/header do commit, ex: feat(#123): alteração de estrutura',
			},
			body: {
				description: BODY_DESCRIPTION,
			},
			footer: {
				description:
					'Footer da alteração (opcional). Contém informações como meta-dados',
			},
		},
	},
};

// do not change
module.exports = config;
