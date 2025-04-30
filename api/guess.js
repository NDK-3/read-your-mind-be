export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST supported' });
  }

  const { qa } = req.body;

  const guess = qa?.find(q => q.answer === 'Yes')?.question.includes('animal')
    ? 'Dog'
    : 'Tree';

  res.status(200).json({ guess });
}