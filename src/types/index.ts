/** The three universes a joke can belong to. */
export type JokeUniverse = 'marvel' | 'dc' | 'versus';

/** Categories the user can pick. "random" draws from every universe. */
export type CategoryId = JokeUniverse | 'random';

/** "twopart" jokes have a setup + hidden punchline; "oneliner" jokes show everything at once. */
export type JokeType = 'twopart' | 'oneliner';

interface JokeBase {
  id: string;
  category: JokeUniverse;
  /** Characters the joke references (used for labels and search). */
  characters: string[];
}

export interface TwoPartJoke extends JokeBase {
  type: 'twopart';
  setup: string;
  punchline: string;
}

export interface OneLinerJoke extends JokeBase {
  type: 'oneliner';
  text: string;
}

export type Joke = TwoPartJoke | OneLinerJoke;

export type ThemePreference = 'light' | 'dark' | 'system';

export interface Settings {
  theme: ThemePreference;
  defaultCategory: CategoryId;
  autoReveal: boolean;
  animations: boolean;
}
