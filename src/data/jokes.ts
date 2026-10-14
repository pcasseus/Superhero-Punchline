/**
 * SUPERHERO PUNCHLINES — joke collection
 * ---------------------------------------
 * Edit this file to add, remove, or change jokes. No external API is used.
 *
 * Every joke needs:
 *   id          unique string (prefix: mv- Marvel, dc- DC, vs- Marvel vs. DC)
 *   category    'marvel' | 'dc' | 'versus'
 *   characters  the heroes or villains the joke mentions
 * Two-part jokes use `setup` + `punchline` (the punchline stays hidden until revealed).
 * One-liners use `text` and are shown all at once.
 */
import type { Joke, JokeUniverse } from '../types';

const twoPart = (
  id: string,
  category: JokeUniverse,
  characters: string[],
  setup: string,
  punchline: string,
): Joke => ({ id, category, characters, type: 'twopart', setup, punchline });

const oneLiner = (id: string, category: JokeUniverse, characters: string[], text: string): Joke => ({
  id,
  category,
  characters,
  type: 'oneliner',
  text,
});

/* ───────────────────────────── MARVEL ───────────────────────────── */
const marvel: Joke[] = [
  twoPart('mv-01', 'marvel', ['Spider-Man'], 'Why does Spider-Man never lose at online games?', 'He has an amazing web connection.'),
  twoPart('mv-02', 'marvel', ['Spider-Man'], 'What do you call Spider-Man after he retires?', 'Peter Parked.'),
  twoPart('mv-03', 'marvel', ['Iron Man'], "What's Iron Man's favorite kind of music?", 'Heavy metal.'),
  twoPart('mv-04', 'marvel', ['Iron Man'], 'Why is Tony Stark such a great public speaker?', 'He always brings his strong suit.'),
  twoPart('mv-05', 'marvel', ['Thor'], "Why are Thor's arms so strong?", 'He never skips hammer day.'),
  oneLiner('mv-06', 'marvel', ['Loki'], 'Loki promised he would quit lying forever. Honestly, it was his best trick yet.'),
  twoPart('mv-07', 'marvel', ['Hulk'], 'Why is the Hulk such a good gardener?', 'He has a green thumb. And a green everything else.'),
  oneLiner('mv-08', 'marvel', ['Hulk', 'Bruce Banner'], 'Bruce Banner took up yoga to stay calm. It worked perfectly until someone stepped on his mat.'),
  twoPart('mv-09', 'marvel', ['Captain America'], 'How did Captain America get so good at history class?', 'He was there for most of it.'),
  twoPart('mv-10', 'marvel', ['Captain America'], 'Why did Steve Rogers fail the pop-culture quiz?', 'He missed about seventy years of homework.'),
  twoPart('mv-11', 'marvel', ['Black Widow'], 'Why should you never play hide-and-seek with Black Widow?', "You'll never find her, and she found you an hour ago."),
  twoPart('mv-12', 'marvel', ['Doctor Strange'], 'Why did Doctor Strange get a parking ticket?', 'He opened his portal in a no-standing zone.'),
  oneLiner('mv-13', 'marvel', ['Doctor Strange'], 'Doctor Strange viewed 14,000,605 possible futures. In every single one, his group chat still left him on read.'),
  twoPart('mv-14', 'marvel', ['Wolverine'], "Why doesn't Wolverine bother with a knife at dinner?", "He's always got three on hand."),
  twoPart('mv-15', 'marvel', ['Wolverine'], "Why can't anyone beat Wolverine at rock-paper-scissors?", 'He only ever throws scissors, and nobody wants to argue.'),
  oneLiner('mv-16', 'marvel', ['Deadpool'], "Deadpool's favorite part of this app? Knowing he's in it. Hi, reader. Yes, you."),
  twoPart('mv-17', 'marvel', ['Deadpool'], 'Why does Deadpool love comic books so much?', "They're the only books where he can read about himself and talk back."),
  twoPart('mv-18', 'marvel', ['Ant-Man'], "What's Ant-Man's favorite kind of story?", 'A really, really short one.'),
  twoPart('mv-19', 'marvel', ['Groot'], 'Why did Groot become a teacher?', 'He wanted to help his students branch out.'),
  oneLiner('mv-20', 'marvel', ['Groot'], 'Groot only knows three words, but his vocabulary is still growing.'),
  twoPart('mv-21', 'marvel', ['Hawkeye'], 'Why is Hawkeye always so calm?', 'He knows exactly when to let things go.'),
  twoPart('mv-22', 'marvel', ['Thanos'], 'Why did Thanos snap at the restaurant?', 'The waiter only brought half his order.'),
  twoPart('mv-23', 'marvel', ['Vision'], "Why doesn't Vision ever need glasses?", 'He was built with perfect Vision.'),
  twoPart('mv-24', 'marvel', ['Star-Lord'], 'Why did Star-Lord fail his driving test?', 'He kept stopping for dance breaks at every red light.'),
];

/* ─────────────────────────────── DC ─────────────────────────────── */
const dc: Joke[] = [
  twoPart('dc-01', 'dc', ['Batman'], 'What does Batman put in his drinks?', 'Just ice.'),
  twoPart('dc-02', 'dc', ['Batman'], "What's Batman's favorite sport?", 'Bat-minton.'),
  oneLiner('dc-03', 'dc', ['Batman'], 'Batman inherited a mansion, a fortune, and a giant cave. Somehow he still only owns black clothes.'),
  twoPart('dc-04', 'dc', ['Superman'], "What's Superman's favorite part of a joke?", 'The punch line.'),
  twoPart('dc-05', 'dc', ['Superman'], 'Why does Superman wear such a tight costume?', "He's a size S."),
  oneLiner('dc-06', 'dc', ['Superman', 'Clark Kent'], "Clark Kent's entire disguise is a pair of glasses, and it still works better than my password."),
  twoPart('dc-07', 'dc', ['Wonder Woman'], 'Why is Wonder Woman so great at job interviews?', 'Everybody tells her the truth eventually.'),
  oneLiner('dc-08', 'dc', ['Wonder Woman'], 'Wonder Woman has never gotten a parking ticket. Nobody can find her invisible jet.'),
  twoPart('dc-09', 'dc', ['The Flash'], 'Why did The Flash fail his math test?', 'He turned it in before the teacher handed it out.'),
  oneLiner('dc-10', 'dc', ['The Flash'], 'The Flash tried to take a selfie. All he got was a very confident blur.'),
  oneLiner('dc-11', 'dc', ['Green Lantern'], "Green Lantern's ring runs on willpower, which explains why it never works on Monday mornings."),
  twoPart('dc-12', 'dc', ['Aquaman'], 'Why does Aquaman struggle at school?', 'His grades are always below C level.'),
  twoPart('dc-13', 'dc', ['Aquaman'], 'Why did Aquaman cross the ocean?', 'To get to the other tide.'),
  twoPart('dc-14', 'dc', ['Joker'], 'Why does the Joker always lose at card games?', 'He keeps playing himself.'),
  oneLiner('dc-15', 'dc', ['Harley Quinn'], 'Harley Quinn has a doctorate in psychiatry. Her bedside manner, however, is mostly confetti.'),
  twoPart('dc-16', 'dc', ['Green Arrow'], 'Why did Green Arrow bring only one arrow to the meeting?', 'He wanted to get straight to the point.'),
  oneLiner('dc-17', 'dc', ['Robin', 'Batman'], 'Robin asked Batman for a raise. Batman said, "I\'ll think about it," then vanished mid-sentence.'),
  oneLiner('dc-18', 'dc', ['Alfred', 'Batman'], 'Alfred has saved Batman more times than any gadget, and he still has to remind him to eat dinner.'),
  twoPart('dc-19', 'dc', ['Catwoman'], "What's Catwoman's favorite subject in school?", 'Hiss-tory.'),
  twoPart('dc-20', 'dc', ['Riddler'], 'Why did the Riddler fail his job interview?', 'He answered every question with another question.'),
  twoPart('dc-21', 'dc', ['Two-Face'], "Why can't Two-Face ever win a debate?", 'He always sees both sides.'),
  oneLiner('dc-22', 'dc', ['Cyborg'], 'Cyborg is half human, half machine, and completely tired of people asking him to fix their printer.'),
  twoPart('dc-23', 'dc', ['Shazam'], 'Why is Billy Batson terrible at small talk?', 'Every time someone asks his hero name, he turns into a superhero.'),
  oneLiner('dc-24', 'dc', ['Lex Luthor'], 'Lex Luthor never has a hair out of place. Mostly because he never has a hair in place, either.'),
];

/* ─────────────────────────── MARVEL vs. DC ─────────────────────────── */
const versus: Joke[] = [
  twoPart('vs-01', 'versus', ['Marvel fans', 'DC fans'], "What's the difference between a Marvel fan and a DC fan?", 'About three hours of arguing in the theater parking lot.'),
  twoPart('vs-02', 'versus', ['Iron Man', 'Batman'], 'Why did Iron Man and Batman become instant friends?', 'They bonded over having way too much money and really cool basements.'),
  twoPart('vs-03', 'versus', ['Iron Man', 'Batman'], 'Iron Man and Batman go out for lunch. Who pays?', 'Iron Man. Batman disappears the second the check arrives.'),
  twoPart('vs-04', 'versus', ['The Flash', 'Quicksilver'], 'Who wins a race between The Flash and Quicksilver?', 'Nobody knows. It ended before the fans sat down.'),
  oneLiner('vs-05', 'versus', ['Superman', 'Thor'], 'Superman and Thor had an arm-wrestling match. The table lost.'),
  twoPart('vs-06', 'versus', ['Aquaman', 'Namor'], 'Why did Aquaman and Namor stop speaking to each other?', 'There was just too much water under the bridge.'),
  twoPart('vs-07', 'versus', ['Deadpool', 'Harley Quinn'], 'Deadpool and Harley Quinn started a band. What did they call it?', 'The Fourth Wall Breakers. Their first song is about you, right now.'),
  oneLiner('vs-08', 'versus', ['Hawkeye', 'Green Arrow'], "Hawkeye and Green Arrow held an archery contest. Both hit perfect bullseyes, and they're still arguing about whose quiver looks cooler."),
  oneLiner('vs-09', 'versus', ['Wolverine', 'Batman'], 'Batman has a utility belt. Wolverine has a utility hand.'),
  twoPart('vs-10', 'versus', ['Shazam', 'Captain Marvel'], 'Why does Shazam always get confused at Marvel parties?', 'Somebody else keeps showing up as "Captain Marvel."'),
  twoPart('vs-11', 'versus', ['Captain America', 'Wonder Woman'], 'Why did Captain America and Wonder Woman hit it off right away?', "They've both fought in a World War and somehow still look great."),
  twoPart('vs-12', 'versus', ['Ant-Man', 'The Atom'], 'Who wins at hide-and-seek: Ant-Man or The Atom?', "Nobody knows. They're both still hiding."),
  twoPart('vs-13', 'versus', ['Avengers', 'Justice League'], "Why don't the Avengers and the Justice League share a headquarters?", "They can't agree on whose turn it is to clean up after the alien invasion."),
  twoPart('vs-14', 'versus', ['Black Widow', 'Catwoman'], 'Black Widow and Catwoman went shopping together. How was the store security?', 'Excellent. Briefly.'),
  twoPart('vs-15', 'versus', ['Loki', 'Joker'], 'Who won the prank war between Loki and the Joker?', "Nobody. It's still going, and so far everyone else has lost."),
  oneLiner('vs-16', 'versus', ['Thanos', 'Darkseid'], 'Thanos and Darkseid finally met. The only thing they agreed on: their chins deserve their own fan clubs.'),
  oneLiner('vs-17', 'versus', ['Marvel heroes', 'DC heroes'], 'Marvel heroes protect the real New York. DC heroes invented Gotham and Metropolis just to avoid New York traffic.'),
  oneLiner('vs-18', 'versus', ['Spider-Man', 'Batman'], 'Spider-Man and Batman shared a rooftop stakeout. Spider-Man told 47 jokes. Batman said "Hmm" once.'),
  oneLiner('vs-19', 'versus', ['Iron Man', 'Batman', 'J.A.R.V.I.S.', 'Alfred'], 'Iron Man has J.A.R.V.I.S. Batman has Alfred. Only one of them will make you a sandwich.'),
  twoPart('vs-20', 'versus', ['Groot', 'Swamp Thing'], 'Why did Groot and Swamp Thing become best friends?', "They're both deeply rooted in their beliefs."),
  twoPart('vs-21', 'versus', ['Thor', 'Shazam'], 'What do Thor and Shazam have in common?', 'Lightning! One gets it from a hammer, the other from yelling one word really loudly.'),
  twoPart('vs-22', 'versus', ['Doctor Strange', 'Zatanna'], 'Why did Doctor Strange win the magic duel against Zatanna?', 'She was still saying her spell backwards when he finished his.'),
  oneLiner('vs-23', 'versus', ['Hulk', 'Superman', 'Batman'], 'Hulk challenged Superman to a staring contest. They both lost to Batman, who never blinks.'),
  twoPart('vs-24', 'versus', ['Captain America', 'Superman'], 'Captain America and Superman tried to pick a team motto. What happened?', 'They both said "Truth and justice," then spent eighty years arguing about who said it first.'),
];

export const JOKES: Joke[] = [...marvel, ...dc, ...versus];

export const JOKE_BY_ID: Record<string, Joke> = Object.fromEntries(JOKES.map((j) => [j.id, j]));
