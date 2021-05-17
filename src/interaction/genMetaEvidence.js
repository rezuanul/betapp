export default (creator, backer, event, creatorBet) => ({
    category: 'Prediction markets',
    title: event,
    description: 'A back-lay bet between two players on the given event.',
    question: 'Considering the event, did the following outcome happen: ' + creatorBet + '?',
    rulingOptions: {
      type: 'single-select',
      titles: ['Yes', 'No'],
      descriptions: [
        'Bet creator wins',
        'Bet backer wins'
      ]
    },
    aliases: {
      [creator]: 'Creator',
      [backer]: 'Backer'
    }
  })
