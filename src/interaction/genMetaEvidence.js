export default (creator, backer, event, creatorBet) => ({
    category: 'Prediction markets',
    title: event,
    description: 'A back-lay bet between two players.',
    question: 'Was the outcome of the event: ' + creatorBet + '?',
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
