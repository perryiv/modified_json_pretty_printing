### Modified JSON Pretty Printing

JSON pretty-printing with arrays of numbers and strings on a single line.

    Usage: node main.js <json file>

With an input file containing this:

    {"a":[[1,2,3,4],[[1,2,3],[1,2,3],[1,2,3]],[[[1,2,3],[1,2,3]],[[1,2,3],[1,2,3]]],["Arrays","of","strings","are","on","one","line","too"],[1,"Arrays","of","mixed","content","are","output","the","normal","way"]],"e":{"f":[{"g":[1,2,3]},{"h":"i"}]}}

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
        [ "Arrays", "of", "strings", "are", "on", "one", "line", "too" ],
        [
          1,
          "Arrays",
          "of",
          "mixed",
          "content",
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
