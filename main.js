
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
//  Is this a string?
//
////////////////////////////////////////////////////////////////////////////////

var isString = function ( obj )
{
  return ( "string" == typeof ( obj ) );
};


////////////////////////////////////////////////////////////////////////////////
//
//  Is this an array?
//
////////////////////////////////////////////////////////////////////////////////

var isArray = function ( obj )
{
  // Inexplicably, this is true: ( "object" == typeof ( null ) )
  // Therefore, we have to test for null. Might as well test for undefined too.
  if ( null === obj )
  {
    return false;
  }

  if ( undefined === obj )
  {
    return false;
  }

  if ( "object" != typeof ( obj ) )
  {
    return false;
  }

  var length = obj.length;

  if ( !isNumber ( length ) )
  {
    return false;
  }

  if ( length < 0 )
  {
    return false;
  }

  return true;
};


////////////////////////////////////////////////////////////////////////////////
//
//  Is this an array of all numbers?
//
////////////////////////////////////////////////////////////////////////////////

var isArrayOfNumbers = function ( a )
{
  if ( !isArray ( a ) )
  {
    return false;
  }

  var num = a.length;

  if ( 0 === num )
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
//  Is this an array of all strings?
//
////////////////////////////////////////////////////////////////////////////////

var isArrayOfStrings = function ( a )
{
  if ( !isArray ( a ) )
  {
    return false;
  }

  var num = a.length;

  if ( 0 === num )
  {
    return false;
  }

  for ( var i = 0; i < num; ++i )
  {
    if ( !isString ( a[i]) )
    {
      return false;
    }
  }

  return true;
};


////////////////////////////////////////////////////////////////////////////////
//
//  Fix the line by removing the id.
//
////////////////////////////////////////////////////////////////////////////////

var fixLine = function ( line, id )
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

  // Return the parts.
  return { first: first, second: second };
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
  if ( argv.length < 3 )
  {
    var thisFile = path.basename ( argv[1] );
    console.log ( "Usage: node", thisFile, "<input json file> [ minified | regular ]" );
    return;
  }

  // Get the input file name.
  var file = argv[2];

  // Read the input file as a string.
  file = fs.readFileSync ( file, "utf8" );

  // Parse the string into an object.
  file = JSON.parse ( file );

  // Indent two spaces.
  var indent = 2;

  // Are there additional options?
  if ( argv.length > 3 )
  {
    var option = argv[3];

    // Are we supposed to write it back out the regular way?
    if ( "regular" == option )
    {
      console.log ( JSON.stringify ( file, null, indent ) );
      return;
    }

    // Are we supposed to write it back out the regular way?
    if ( "minified" == option )
    {
      console.log ( JSON.stringify ( file ) );
      return;
    }
  }


  // We use these unique ids below.
  var idNumbers = "067D-78F5-81BD-4597-8E5F-7CDC-279E-A7D4-53C2-19AF-99CD-43F5-9257";
  var idStrings = "353A-8D4A-C7F9-42C1-B938-79BD-2436-EC1D-D8BF-2B3B-E4D6-4C58-95EF";

  // Turn the object back into a string but with some modifications.
  file = JSON.stringify ( file, function ( key, value )
  {
    // If this value is an array of numbers...
    if ( isArrayOfNumbers ( value ) )
    {
      // Change this value into a string with our unique id at the beginning.
      return ( idNumbers + "[ " + value.join ( ", " ) + " ]" );
    }

    // If this value is an array of strings...
    else if ( isArrayOfStrings ( value ) )
    {
      // Change this value into a string with our unique id at the beginning.
      return ( idStrings + "[ " + value.join ( ", " ) + " ]" );
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

    // If we find our unique id for numbers somewhere in this line...
    if ( -1 !== line.indexOf ( idNumbers ) )
    {
      // Fix the line and put it back together.
      var fixed = fixLine ( line, idNumbers );
      line = fixed.first + fixed.second;
    }

    // If we find our unique id for strings somewhere in this line...
    else if ( -1 !== line.indexOf ( idStrings ) )
    {
      // Fix the line.
      var fixed = fixLine ( line, idStrings );
      var second = fixed.second;

      // Wrap all the words with quotes.
      second = second.replace ( /, /g, "\", \"" );
      second = second.replace ( "\[ ", "[ \"" );
      second = second.replace ( " \]", "\" \]" );

      // Put the line back together.
      line = fixed.first + second;
    }

    // Print the line.
    console.log ( line );
  }

} ) ();
