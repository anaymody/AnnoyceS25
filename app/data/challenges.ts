export type Challenge = {
  type: 'treat' | 'trick';
  message: string;
};

const challenges: Challenge[] = [
  { type: 'treat', message: 'You got a cute cat GIF!' },
  { type: 'treat', message: 'You won a mini-game!' },
  { type: 'trick', message: 'Boo! Jump scare!' },
  { type: 'trick', message: 'Here’s a tricky riddle: What has keys but can’t open locks?' },
];

export default challenges;