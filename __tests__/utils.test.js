const { createRefObj, formatData } = require('../db/utils/utils');

describe('createRefObj', () => {
  test('returns an empty object when passed an empty array', () => {
    expect(createRefObj([], '', '')).toEqual({});
  });
  test('creates a reference object from a single array element', () => {
    const dataInput = [{ genre_id: 1, genre: 'adventure' }];

    const refObj = createRefObj(dataInput, 'genre', 'genre_id');

    expect(refObj).toEqual({ adventure: 1 });
  });
  test('creates a reference object from multiple array elements', () => {
    const dataInput = [
      { genre_id: 1, genre: 'adventure' },
      { genre_id: 2, genre: 'documentary' },
      { genre_id: 3, genre: 'comedy' },
      { genre_id: 4, genre: 'drama' },
      { genre_id: 5, genre: 'fantasy' },
      { genre_id: 6, genre: 'horror' },
      { genre_id: 7, genre: 'action' },
      { genre_id: 8, genre: 'animation' },
      { genre_id: 9, genre: 'musical' }
    ];
    const expectedRefObj = {
      adventure: 1,
      documentary: 2,
      comedy: 3,
      drama: 4,
      fantasy: 5,
      horror: 6,
      action: 7,
      animation: 8,
      musical: 9
    };

    const refObj = createRefObj(dataInput, 'genre', 'genre_id');

    expect(refObj).toEqual(expectedRefObj);
  });
  test('does not mutate input array', () => {
    const dataInput = [
      { genre_id: 1, genre: 'adventure' },
      { genre_id: 2, genre: 'documentary' },
      { genre_id: 3, genre: 'comedy' },
      { genre_id: 4, genre: 'drama' },
      { genre_id: 5, genre: 'fantasy' },
      { genre_id: 6, genre: 'horror' },
      { genre_id: 7, genre: 'action' },
      { genre_id: 8, genre: 'animation' },
      { genre_id: 9, genre: 'musical' }
    ];
    const dataInputCopy = [
      { genre_id: 1, genre: 'adventure' },
      { genre_id: 2, genre: 'documentary' },
      { genre_id: 3, genre: 'comedy' },
      { genre_id: 4, genre: 'drama' },
      { genre_id: 5, genre: 'fantasy' },
      { genre_id: 6, genre: 'horror' },
      { genre_id: 7, genre: 'action' },
      { genre_id: 8, genre: 'animation' },
      { genre_id: 9, genre: 'musical' }
    ];
    createRefObj(dataInput, 'genre', 'genre_id');

    expect(dataInput).toEqual(dataInputCopy);
  });
});

describe('formatData', () => {
  test('returns an empty array when passed an empty array', () => {
    expect(formatData({}, [], '', '')).toEqual([]);
  });
  test('swaps a property on a single array element', () => {
    const dataInput = [
      {
        title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
        genre: 'documentary',
        runtime: 149,
        director: 'Jarad Axon',
        certificate: 'PG'
      }
    ];
    const refInput = {
      documentary: 8
    };
    const expectedOutput = [
      {
        title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
        genre_id: 8,
        runtime: 149,
        director: 'Jarad Axon',
        certificate: 'PG'
      }
    ];

    const output = formatData(refInput, dataInput, 'genre_id', 'genre');
    expect(output).toEqual(expectedOutput);
  });
  test('swaps a property on multiple array elements', () => {
    const dataInput = [
      {
        title: 'NeverEnding Story II: The Next Chapter, The',
        genre: 'adventure',
        runtime: 149,
        director: 'Shirleen Cathersides',
        certificate: '15'
      },
      {
        title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
        genre: 'documentary',
        runtime: 149,
        director: 'Jarad Axon',
        certificate: 'PG'
      },
      {
        title: 'Nude Bomb, The',
        genre: 'comedy',
        runtime: 36,
        director: 'Stanislas Jordon',
        certificate: '15'
      },
      {
        title: 'Insomnia',
        genre: 'drama',
        runtime: 236,
        director: 'Cherrita Shoppee',
        certificate: '18'
      },
      {
        title: 'Chariots of the Gods (Erinnerungen an die Zukunft)',
        genre: 'documentary',
        runtime: 64,
        director: 'Jessa Dorow',
        certificate: '18'
      }
    ];
    const refInput = {
      adventure: 1,
      documentary: 2,
      comedy: 3,
      drama: 4
    };
    const expectedOutput = [
      {
        title: 'NeverEnding Story II: The Next Chapter, The',
        genre_id: 1,
        runtime: 149,
        director: 'Shirleen Cathersides',
        certificate: '15'
      },
      {
        title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
        genre_id: 2,
        runtime: 149,
        director: 'Jarad Axon',
        certificate: 'PG'
      },
      {
        title: 'Nude Bomb, The',
        genre_id: 3,
        runtime: 36,
        director: 'Stanislas Jordon',
        certificate: '15'
      },
      {
        title: 'Insomnia',
        genre_id: 4,
        runtime: 236,
        director: 'Cherrita Shoppee',
        certificate: '18'
      },
      {
        title: 'Chariots of the Gods (Erinnerungen an die Zukunft)',
        genre_id: 2,
        runtime: 64,
        director: 'Jessa Dorow',
        certificate: '18'
      }
    ];

    const output = formatData(refInput, dataInput, 'genre_id', 'genre');
    expect(output).toEqual(expectedOutput);
  });
  test('does not mutate input array or ref obj', () => {
    const dataInput = [
      {
        title: 'NeverEnding Story II: The Next Chapter, The',
        genre: 'adventure',
        runtime: 149,
        director: 'Shirleen Cathersides',
        certificate: '15'
      },
      {
        title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
        genre: 'documentary',
        runtime: 149,
        director: 'Jarad Axon',
        certificate: 'PG'
      },
      {
        title: 'Nude Bomb, The',
        genre: 'comedy',
        runtime: 36,
        director: 'Stanislas Jordon',
        certificate: '15'
      },
      {
        title: 'Insomnia',
        genre: 'drama',
        runtime: 236,
        director: 'Cherrita Shoppee',
        certificate: '18'
      },
      {
        title: 'Chariots of the Gods (Erinnerungen an die Zukunft)',
        genre: 'documentary',
        runtime: 64,
        director: 'Jessa Dorow',
        certificate: '18'
      }
    ];
    const refInput = {
      adventure: 1,
      documentary: 2,
      comedy: 3,
      drama: 4
    };
    const dataInputCopy = [
      {
        title: 'NeverEnding Story II: The Next Chapter, The',
        genre: 'adventure',
        runtime: 149,
        director: 'Shirleen Cathersides',
        certificate: '15'
      },
      {
        title: "Howard Zinn: You Can't Be Neutral on a Moving Train",
        genre: 'documentary',
        runtime: 149,
        director: 'Jarad Axon',
        certificate: 'PG'
      },
      {
        title: 'Nude Bomb, The',
        genre: 'comedy',
        runtime: 36,
        director: 'Stanislas Jordon',
        certificate: '15'
      },
      {
        title: 'Insomnia',
        genre: 'drama',
        runtime: 236,
        director: 'Cherrita Shoppee',
        certificate: '18'
      },
      {
        title: 'Chariots of the Gods (Erinnerungen an die Zukunft)',
        genre: 'documentary',
        runtime: 64,
        director: 'Jessa Dorow',
        certificate: '18'
      }
    ];
    const refInputCopy = {
      adventure: 1,
      documentary: 2,
      comedy: 3,
      drama: 4
    };

    formatData(refInput, dataInput, 'genre_id', 'genre');

    expect(refInput).toEqual(refInputCopy);
    expect(dataInput).toEqual(dataInputCopy);
  });
});
