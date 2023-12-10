const data = [
    'Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child fo exed child fo exed child for.',
    'Traveling became almost extinct during the pandemic.Dolores wouldn\'t have eaten the meal if she known what it actually was. She wrote him a long letter, but he didn\'t read it.',
    'Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind. It isn\'t difficult to do a handstand if you just stand on your hands.'
]

export const getText = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex].split('');
}