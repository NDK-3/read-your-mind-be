
import words from './words.json';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { qa } = req.body;
  if (!qa || !Array.isArray(qa)) {
    return res.status(400).json({ message: 'Invalid input format' });
  }

  let possibleWords = words;

  for (const { question, answer } of qa) {
    const key = mapQuestionToKey(question);
    if (!key) continue;

    if (answer === 'Yes') {
      possibleWords = possibleWords.filter(w => w.attributes[key] === true);
    } else if (answer === 'No') {
      possibleWords = possibleWords.filter(w => w.attributes[key] === false);
    }
  }

  const guess = possibleWords[0]?.word || null;
  return res.status(200).json({ guess });
}

function mapQuestionToKey(q) {
  q = q.toLowerCase();
  if (q.includes('living')) return 'isLiving';
  if (q.includes('plant')) return 'isPlant';
  if (q.includes('animal')) return 'isAnimal';
  if (q.includes('eat')) return 'isEdible';
  if (q.includes('electronic')) return 'isElectronic';
  if (q.includes('man-made')) return 'isManMade';
  if (q.includes('found in nature')) return 'isNatural';
  if (q.includes('bigger than a car')) return 'isLarge';
  if (q.includes('emotions')) return 'hasEmotions';
  if (q.includes('fly')) return 'canFly';
  if (q.includes('transportation')) return 'isTransportation';
  if (q.includes('underwater')) return 'livesUnderwater';
  if (q.includes('metal')) return 'isMetal';
  if (q.includes('daily')) return 'usedDaily';
  if (q.includes('technology')) return 'relatedToTech';
  if (q.includes('solid')) return 'isSolid';
  return null;
}
