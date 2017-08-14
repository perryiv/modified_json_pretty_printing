
////////////////////////////////////////////////////////////////////////////////
//
//  MIT License
//
//  Copyright (c) 2017 Perry L Miller IV
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////////////////////////////////////////////////////

var fs = require ( "fs" );
var path = require ( "path" );


////////////////////////////////////////////////////////////////////////////////
//
//  Is this a number?
//
////////////////////////////////////////////////////////////////////////////////

var isNumber = function ( obj )
{
  return ( "number" == typeof ( obj ) );
};


////////////////////////////////////////////////////////////////////////////////
//
//  Is this an array of all numbers?
//
////////////////////////////////////////////////////////////////////////////////

var isArrayOfNumbers = function ( a )
{
  if ( !a )
  {
    return false;
  }

  var num = a.length;

  if ( ( 0 === num ) || ( null === num ) || ( undefined === num ) )
  {
    return false;
  }

  for ( var i = 0; i < num; ++i )
  {
    if ( !isNumber ( a[i]) )
    {
      return false;
    }
  }

  return true;
};


////////////////////////////////////////////////////////////////////////////////
//
//  The main function, sort of.
//
////////////////////////////////////////////////////////////////////////////////

( function()
{
  // Shortcuts.
  var argv = process.argv;

  // Check input arguments.
  if ( argv.length !== 3 )
  {
    var thisFile = path.basename ( argv[1] );
    console.log ( "Usage: node", thisFile, "<input json file>" );
    return;
  }

  // Get the input file name.
  var file = argv[2];

  // Read the input file as a string.
  file = fs.readFileSync ( file, "utf8" );

  // Parse the string into an object.
  file = JSON.parse ( file );

  // We use this unique id below.
  var id = "067D-78F5-81BD-4597-8E5F-7CDC-279E-A7D4-53C2-19AF-99CD-43F5-9257";

  // Indent two spaces.
  var indent = 2;

  // Uncomment these next two lines to see regular output.
  // console.log ( JSON.stringify ( file, null, indent ) );
  // return;

  // Turn the object back into a string but with some modifications.
  file = JSON.stringify ( file, function ( key, value )
  {
    // If this value is an array of numbers...
    if ( isArrayOfNumbers ( value ) )
    {
      // Change this value into a string with our unique id at the beginning.
      return ( id + "[ " + value.join ( ", " ) + " ]" );
    }

    // Otherwise, return the value as-is.
    else
    {
      return value;
    }
  }, indent );

  // Split the pretty-printed JSON string into lines.
  var lines = file.split ( "\n" );

  // Loop through the lines.
  var numLines = lines.length;
  for ( var i = 0; i < numLines; ++i )
  {
    var line = lines[i];

    // If we find our unique id somewhere in this line...
    if ( -1 !== line.indexOf ( id ) )
    {
      // Split the line at our id.
      var parts = line.split ( id );
      var first = parts[0];
      var second = parts[1];

      // Drop the trailing quote on the first part.
      first = first.slice ( 0, first.length - 1 );

      // Remove the quote in the second part.
      // This way we preserve a trailing comma, if any.
      second = second.replace ( "\"", "" );

      // Put the line back together.
      line = first + second;
    }

    // Print the line.
    console.log ( line );
  }

} ) ();
