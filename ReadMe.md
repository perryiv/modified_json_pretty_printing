### Modified JSON Pretty Printing

JSON "pretty printing" with arrays of numbers on a single line.

    Usage: node main.js <json file>

With this input:

    {"a":[[1,2,3,4],[[1,2,3],[1,2,3],[1,2,3]],[[[1,2,3],[1,2,3]],[[1,2,3],[1,2,3]]],["Arrays","of","anything","else","are","output","the","normal","way"]],"e":{"f":[{"g":[1,2,3]},{"h":"i"}]}}

This script will output the following:

    {
      "a": [
        [ 1, 2, 3, 4 ],
        [
          [ 1, 2, 3 ],
          [ 1, 2, 3 ],
          [ 1, 2, 3 ]
        ],
        [
          [
            [ 1, 2, 3 ],
            [ 1, 2, 3 ]
          ],
          [
            [ 1, 2, 3 ],
            [ 1, 2, 3 ]
          ]
        ],
        [
          "Arrays",
          "of",
          "anything",
          "else",
          "are",
          "output",
          "the",
          "normal",
          "way"
        ]
      ],
      "e": {
        "f": [
          {
            "g": [ 1, 2, 3 ]
          },
          {
            "h": "i"
          }
        ]
      }
    }
