// Complete all-time lecture list from multiple cross-referenced sources
// Compiled from: KU ArcD website, Andrea Herstowski's list, Barry Fitzgerald's list, LJWorld archives
// Total: 566 lectures from Fall 1983 through Spring 2026

export interface AllTimeLecture {
  name: string;
  semester: "Fall" | "Spring";
  year: number;
  note?: string;
}

export const allTimeLectures: AllTimeLecture[] = [
  // ==================== 1983 ====================
  // Fall 1983
  { name: "Alan Cober", semester: "Fall", year: 1983 },
  { name: "Richard Gangel", semester: "Fall", year: 1983 },
  { name: "Tim Hamill", semester: "Fall", year: 1983 },
  { name: "James McMullan", semester: "Fall", year: 1983 },
  { name: "John Muller", semester: "Fall", year: 1983 },
  { name: "Ron Sullivan", semester: "Fall", year: 1983 },

  // ==================== 1984 ====================
  // Spring 1984
  { name: "Charles Barsotti", semester: "Spring", year: 1984 },
  { name: "Dagmar Frinta & Vivienne Flesher", semester: "Spring", year: 1984 },
  { name: "Judy Garlan", semester: "Spring", year: 1984 },
  { name: "Milton Glaser", semester: "Spring", year: 1984 },
  { name: "Philip Meggs", semester: "Spring", year: 1984 },
  { name: "Don Trousdell", semester: "Spring", year: 1984 },
  { name: "Carol Wald", semester: "Spring", year: 1984 },

  // Fall 1984
  { name: "Marshall Arisman", semester: "Fall", year: 1984 },
  { name: "Lou Dorfsman", semester: "Fall", year: 1984 },
  { name: "Steven Heller", semester: "Fall", year: 1984 },
  { name: "Rudi Hoglund", semester: "Fall", year: 1984 },
  { name: "Marvin Mattelson", semester: "Fall", year: 1984 },
  { name: "Howard Paine", semester: "Fall", year: 1984 },
  { name: "Fred Woodward", semester: "Fall", year: 1984 },

  // ==================== 1985 ====================
  // Spring 1985
  { name: "Alexa Grace", semester: "Spring", year: 1985 },
  { name: "Will Hopkins & Mary Kay Baumann", semester: "Spring", year: 1985 },
  { name: "Michael Vanderbyl", semester: "Spring", year: 1985 },
  { name: "Paula Scher", semester: "Spring", year: 1985 },
  { name: "Robert Weaver", semester: "Spring", year: 1985 },
  { name: "Gahan Wilson", semester: "Spring", year: 1985 },
  { name: "Walter Bernard", semester: "Spring", year: 1985 },

  // Fall 1985
  { name: "Edward Booth-Clibborn", semester: "Fall", year: 1985 },
  { name: "Richard Danne", semester: "Fall", year: 1985 },
  { name: "Teresa Fasolino", semester: "Fall", year: 1985 },
  { name: "Duane Michals", semester: "Fall", year: 1985 },
  { name: "Robert Andrew Parker", semester: "Fall", year: 1985 },
  { name: "Elton Robinson", semester: "Fall", year: 1985 },

  // ==================== 1986 ====================
  // Spring 1986
  { name: "Tommy Allen", semester: "Spring", year: 1986 },
  { name: "Robert Benton", semester: "Spring", year: 1986 },
  { name: "Tomie dePaola", semester: "Spring", year: 1986 },
  { name: "Dick Hess", semester: "Spring", year: 1986 },
  { name: "Elwood H. Smith", semester: "Spring", year: 1986 },
  { name: "Deborah Sussman", semester: "Spring", year: 1986 },
  { name: "Louise Fili", semester: "Spring", year: 1986 },
  { name: "John Collier", semester: "Spring", year: 1986 },

  // Fall 1986
  { name: "Louise Fili", semester: "Fall", year: 1986 },
  { name: "Seymour Chwast", semester: "Fall", year: 1986 },
  { name: "Ralph Caplan", semester: "Fall", year: 1986 },
  { name: "Etienne Delessert", semester: "Fall", year: 1986 },
  { name: "Cipe Pineles Burtin", semester: "Fall", year: 1986 },
  { name: "Chris Pullman", semester: "Fall", year: 1986 },
  { name: "Henry Wolf", semester: "Fall", year: 1986 },

  // ==================== 1987 ====================
  // Spring 1987
  { name: "Kit Hinrichs & Neil Shakery", semester: "Spring", year: 1987 },
  { name: "Paul Davis", semester: "Spring", year: 1987 },
  { name: "Rudolph de Harak", semester: "Spring", year: 1987 },
  { name: "David Macaulay", semester: "Spring", year: 1987 },
  { name: "Rita Marshall", semester: "Spring", year: 1987 },

  // Fall 1987
  { name: "Guy Billout", semester: "Fall", year: 1987 },
  { name: "Ivan Chermayeff", semester: "Fall", year: 1987 },
  { name: "Alan Cober", semester: "Fall", year: 1987 },
  { name: "Frances Foster, Denise Cronin & Alfred A. Knopf", semester: "Fall", year: 1987 },
  { name: "John McConnell", semester: "Fall", year: 1987 },
  { name: "Bruce McIntosh", semester: "Fall", year: 1987 },
  { name: "Bruno Monguzzi", semester: "Fall", year: 1987 },

  // ==================== 1988 ====================
  // Fall 1988
  { name: "Marshall Arisman", semester: "Fall", year: 1988 },
  { name: "Barry Moser", semester: "Fall", year: 1988 },
  { name: "John Newcomb", semester: "Fall", year: 1988 },
  { name: "Peter Sis", semester: "Fall", year: 1988 },
  { name: "Don Trousdell", semester: "Fall", year: 1988 },
  { name: "Richard Saul Wurman", semester: "Fall", year: 1988 },

  // ==================== 1989 ====================
  // Spring 1989
  { name: "R.O. Blechman", semester: "Spring", year: 1989 },
  { name: "Stavros Cosmopulos", semester: "Spring", year: 1989 },
  { name: "Keith Godard", semester: "Spring", year: 1989 },
  { name: "Steven Guarnaccia", semester: "Spring", year: 1989 },
  { name: "Cheryl Heller", semester: "Spring", year: 1989 },
  { name: "Dugald Stermer", semester: "Spring", year: 1989 },
  { name: "Ann Willoughby", semester: "Spring", year: 1989 },

  // Fall 1989
  { name: "Judy Garlan", semester: "Fall", year: 1989 },
  { name: "Robert Grossman", semester: "Fall", year: 1989 },
  { name: "Anita Kunz", semester: "Fall", year: 1989 },
  { name: "Paul McKenna", semester: "Fall", year: 1989 },
  { name: "John Muller", semester: "Fall", year: 1989 },
  { name: "Jack Summerford", semester: "Fall", year: 1989 },
  { name: "Nick Vedros", semester: "Fall", year: 1989 },

  // ==================== 1990 ====================
  // Spring 1990
  { name: "Tom Allen", semester: "Spring", year: 1990 },
  { name: "Brandy Bralds", semester: "Spring", year: 1990 },
  { name: "Ron Campisi", semester: "Spring", year: 1990 },
  { name: "Stavros Cosmopulos", semester: "Spring", year: 1990 },
  { name: "Mo Lebowitz", semester: "Spring", year: 1990 },
  { name: "Duane Michals", semester: "Spring", year: 1990 },
  { name: "James Miho", semester: "Spring", year: 1990 },
  { name: "Tyler Smith", semester: "Spring", year: 1990 },

  // Fall 1990
  { name: "Henrietta Condak", semester: "Fall", year: 1990 },
  { name: "Heather Cooper", semester: "Fall", year: 1990 },
  { name: "McRay Magleby", semester: "Fall", year: 1990 },

  // ==================== 1991 ====================
  // Spring 1991
  { name: "Henrik Drescher", semester: "Spring", year: 1991 },
  { name: "Woody Pirtle", semester: "Spring", year: 1991 },
  { name: "Ken Raglin", semester: "Spring", year: 1991 },
  { name: "Victor Skrebneski", semester: "Spring", year: 1991 },
  { name: "Mark Sottnick", semester: "Spring", year: 1991 },
  { name: "Don Trousdell", semester: "Spring", year: 1991 },

  // Fall 1991
  { name: "Walter Bernard", semester: "Fall", year: 1991 },
  { name: "Alan Cober", semester: "Fall", year: 1991 },
  { name: "Paul Davis", semester: "Fall", year: 1991 },
  { name: "Nancy Rice", semester: "Fall", year: 1991 },
  { name: "Virginia Smith", semester: "Fall", year: 1991 },
  { name: "Massimo Vignelli", semester: "Fall", year: 1991 },

  // ==================== 1992 ====================
  // Spring 1992
  { name: "Jacques D'Amoise", semester: "Spring", year: 1992 },
  { name: "Steven Heller", semester: "Spring", year: 1992 },
  { name: "Maira Kalman", semester: "Spring", year: 1992 },
  { name: "Tony Palladino", semester: "Spring", year: 1992 },
  { name: "Fred Woodward", semester: "Spring", year: 1992 },

  // Fall 1992
  { name: "Guy Billout", semester: "Fall", year: 1992 },
  { name: "Patricia Bradbury", semester: "Fall", year: 1992 },
  { name: "Louise Fili", semester: "Fall", year: 1992 },
  { name: "Lane Judd", semester: "Fall", year: 1992 },
  { name: "Art Kane", semester: "Fall", year: 1992 },

  // ==================== 1993 ====================
  // Spring 1993
  { name: "Marshall Arisman", semester: "Spring", year: 1993 },
  { name: "Ralph Caplan", semester: "Spring", year: 1993 },
  { name: "Richard Danne", semester: "Spring", year: 1993 },
  { name: "Milton Glaser", semester: "Spring", year: 1993 },
  { name: "Stewart McBride", semester: "Spring", year: 1993 },
  { name: "Robert Andrew Parker", semester: "Spring", year: 1993 },
  { name: "Paula Scher", semester: "Spring", year: 1993 },
  { name: "Brad Sneed", semester: "Spring", year: 1993 },

  // Fall 1993
  { name: "Sam Antiput", semester: "Fall", year: 1993 },
  { name: "Bob Ciano", semester: "Fall", year: 1993 },
  { name: "Gene Federico", semester: "Fall", year: 1993 },
  { name: "Steven Johnson", semester: "Fall", year: 1993 },
  { name: "James McMullan", semester: "Fall", year: 1993 },
  { name: "Skolos & Wedell", semester: "Fall", year: 1993 },
  { name: "D.K. Holland", semester: "Fall", year: 1993 },
  { name: "Matthew Carter", semester: "Fall", year: 1993 },
  { name: "Estelle Ellis", semester: "Fall", year: 1993 },
  { name: "Mark Chickinelli", semester: "Fall", year: 1993 },

  // ==================== 1994 ====================
  // Spring 1994
  { name: "Sheila de Bretteville", semester: "Spring", year: 1994 },
  { name: "Etienne Delessert", semester: "Spring", year: 1994 },
  { name: "Mick Haggerty", semester: "Spring", year: 1994 },
  { name: "Anita Kunz", semester: "Spring", year: 1994 },
  { name: "Mo Lebowitz", semester: "Spring", year: 1994 },
  { name: "Stephen Sidelinger", semester: "Spring", year: 1994 },
  { name: "Henry Wolf", semester: "Spring", year: 1994 },

  // Fall 1994
  { name: "Don Assmussen", semester: "Fall", year: 1994 },
  { name: "Michael Bierut", semester: "Fall", year: 1994 },
  { name: "Howard Brown", semester: "Fall", year: 1994 },
  { name: "Greg Garvey", semester: "Fall", year: 1994 },
  { name: "D.K. Holland", semester: "Fall", year: 1994 },
  { name: "Michael McCoy", semester: "Fall", year: 1994 },
  { name: "Julia Maudlin", semester: "Fall", year: 1994 },

  // ==================== 1995 ====================
  // Spring 1995
  { name: "Mark Fox", semester: "Spring", year: 1995 },
  { name: "Lance Hidy", semester: "Spring", year: 1995 },
  { name: "Michael Hoeflich", semester: "Spring", year: 1995 },
  { name: "Julie Lasky", semester: "Spring", year: 1995 },
  { name: "Simms Taback", semester: "Spring", year: 1995 },
  { name: "Lowell Thompson", semester: "Spring", year: 1995 },
  { name: "Todd Waterbury", semester: "Spring", year: 1995 },

  // Fall 1995
  { name: "Gail Anderson", semester: "Fall", year: 1995 },
  { name: "Gary Baseman", semester: "Fall", year: 1995 },
  { name: "David Carson", semester: "Fall", year: 1995 },

  // ==================== 1996 ====================
  // Spring 1996
  { name: "Grace Colby", semester: "Spring", year: 1996 },
  { name: "Patrick Coyne", semester: "Spring", year: 1996 },
  { name: "Dikko Faust", semester: "Spring", year: 1996 },
  { name: "C.B. Mordan", semester: "Spring", year: 1996 },
  { name: "Ester Smith", semester: "Spring", year: 1996 },
  { name: "Glynis Sweeney", semester: "Spring", year: 1996 },
  { name: "Alan Cober", semester: "Spring", year: 1996 },
  { name: "Lou Danziger", semester: "Spring", year: 1996 },
  { name: "Forrest Richardson", semester: "Spring", year: 1996 },
  { name: "Valerie Richardson", semester: "Spring", year: 1996 },
  { name: "D.J. Stout", semester: "Spring", year: 1996 },
  { name: "Michael Vanderbyl", semester: "Spring", year: 1996 },
  { name: "Jay Vigon", semester: "Spring", year: 1996 },
  { name: "Richard Wilde", semester: "Spring", year: 1996 },

  // Fall 1996
  { name: "James Cross", semester: "Fall", year: 1996 },
  { name: "Eric Dinyer", semester: "Fall", year: 1996 },
  { name: "Jenny Faw", semester: "Fall", year: 1996 },
  { name: "Louise Fili", semester: "Fall", year: 1996 },
  { name: "Steve Frykholm", semester: "Fall", year: 1996 },
  { name: "Michael Mabry", semester: "Fall", year: 1996 },
  { name: "Shelley Meredith", semester: "Fall", year: 1996 },
  { name: "Jose Ortega", semester: "Fall", year: 1996 },
  { name: "Dan Weig", semester: "Fall", year: 1996 },

  // ==================== 1997 ====================
  // Spring 1997
  { name: "Aubrey Balkind", semester: "Spring", year: 1997 },
  { name: "Sonia Bretman", semester: "Spring", year: 1997 },
  { name: "Lance Hidy", semester: "Spring", year: 1997 },
  { name: "Bill Mayer", semester: "Spring", year: 1997 },
  { name: "Barry Moser", semester: "Spring", year: 1997 },
  { name: "Douglas Oliver", semester: "Spring", year: 1997 },
  { name: "Rob Price", semester: "Spring", year: 1997 },

  // Fall 1997
  { name: "Bryan Dorsey", semester: "Fall", year: 1997 },
  { name: "Mathew Duntemann", semester: "Fall", year: 1997 },
  { name: "Debra Friday", semester: "Fall", year: 1997 },
  { name: "Mary Grandpre", semester: "Fall", year: 1997 },
  { name: "Kenna Kay", semester: "Fall", year: 1997 },
  { name: "Michael Mabry", semester: "Fall", year: 1997 },
  { name: "Mateo Neri", semester: "Fall", year: 1997 },
  { name: "Vance Studley", semester: "Fall", year: 1997 },
  { name: "Ann Willoughby", semester: "Fall", year: 1997 },
  { name: "James Yang", semester: "Fall", year: 1997 },

  // ==================== 1998 ====================
  // Spring 1998
  { name: "Richard Branham", semester: "Spring", year: 1998 },
  { name: "Vivienne Flesher", semester: "Spring", year: 1998 },
  { name: "Virginia Geshan", semester: "Spring", year: 1998 },
  { name: "Stephen Johnson", semester: "Spring", year: 1998 },
  { name: "John Sayles", semester: "Spring", year: 1998 },
  { name: "Joe Sorren", semester: "Spring", year: 1998 },
  { name: "Deborah Sussman", semester: "Spring", year: 1998 },
  { name: "Nick Vedros", semester: "Spring", year: 1998 },
  { name: "Matt Walton", semester: "Spring", year: 1998 },

  // Fall 1998
  { name: "Robert Fisher", semester: "Fall", year: 1998 },
  { name: "Douglas Frasier", semester: "Fall", year: 1998 },
  { name: "Kent Oberheu", semester: "Fall", year: 1998 },
  { name: "Billy Pittard", semester: "Fall", year: 1998 },
  { name: "Peter Raine", semester: "Fall", year: 1998 },
  { name: "Terry Shave", semester: "Fall", year: 1998 },
  { name: "David Weightman", semester: "Fall", year: 1998 },
  { name: "Andi Witczak", semester: "Fall", year: 1998 },

  // ==================== 1999 ====================
  // Spring 1999
  { name: "Chris Bernardi", semester: "Spring", year: 1999 },
  { name: "Rick Cusick", semester: "Spring", year: 1999 },
  { name: "Laurie DeMartino", semester: "Spring", year: 1999 },
  { name: "Augusto Grillo", semester: "Spring", year: 1999 },
  { name: "Gary Kelly", semester: "Spring", year: 1999 },
  { name: "Chris Lensch", semester: "Spring", year: 1999 },
  { name: "Claire Van Vliet", semester: "Spring", year: 1999 },

  // Fall 1999
  { name: "John Downer", semester: "Fall", year: 1999 },
  { name: "Ron Fondaw", semester: "Fall", year: 1999 },
  { name: "Carter Goodrich", semester: "Fall", year: 1999 },

  // ==================== 2000 ====================
  // Spring 2000
  { name: "Wayne Hunt", semester: "Spring", year: 2000 },
  { name: "Tim Jessell", semester: "Spring", year: 2000 },
  { name: "Paul Mazzucca", semester: "Spring", year: 2000 },
  { name: "Ingrid Sidie", semester: "Spring", year: 2000 },
  { name: "Michelle Sonderegger", semester: "Spring", year: 2000 },
  { name: "Timothy Barrett", semester: "Spring", year: 2000 },
  { name: "Melinda Beck", semester: "Spring", year: 2000 },
  { name: "Malcolm Grear", semester: "Spring", year: 2000 },
  { name: "Augusto Grillo", semester: "Spring", year: 2000 },
  { name: "Brock Haldeman", semester: "Spring", year: 2000 },
  { name: "Jordan Isip", semester: "Spring", year: 2000 },
  { name: "Ellen Lupton", semester: "Spring", year: 2000 },
  { name: "Mark Oldach", semester: "Spring", year: 2000 },

  // Fall 2000
  { name: "Paul Sproll", semester: "Fall", year: 2000 },
  { name: "Joseph Fiedler", semester: "Fall", year: 2000 },
  { name: "Armando Milani", semester: "Fall", year: 2000 },
  { name: "Kevin Bradley & Julie Blecher", semester: "Fall", year: 2000 },
  { name: "David Buss", semester: "Fall", year: 2000 },
  { name: "Whitney Sherman", semester: "Fall", year: 2000 },
  { name: "May Tveit", semester: "Fall", year: 2000 },

  // ==================== 2001 ====================
  // Spring 2001
  { name: "Ziek Bhakti", semester: "Spring", year: 2001 },
  { name: "Achim Weilande & Marion Delhees", semester: "Spring", year: 2001 },
  { name: "Maggie Orth", semester: "Spring", year: 2001 },
  { name: "Malcolm McCullough", semester: "Spring", year: 2001 },
  { name: "Richard Mawdsley", semester: "Spring", year: 2001 },
  { name: "Bruno Monguzzi", semester: "Spring", year: 2001 },

  // Fall 2001
  { name: "Pat Flynn", semester: "Fall", year: 2001 },
  { name: "Steven Johnson", semester: "Fall", year: 2001 },
  { name: "Christopher Budd", semester: "Fall", year: 2001 },
  { name: "Dorothy Dunn", semester: "Fall", year: 2001 },
  { name: "Anne Wilson", semester: "Fall", year: 2001 },
  { name: "Marc Urkesen", semester: "Fall", year: 2001 },
  { name: "Gus Kayafas", semester: "Fall", year: 2001 },

  // ==================== 2002 ====================
  // Spring 2002
  { name: "Paul Sahre", semester: "Spring", year: 2002 },

  // Fall 2002
  { name: "Jack Lew", semester: "Fall", year: 2002 },
  { name: "Anne Currier", semester: "Fall", year: 2002 },
  { name: "Tucker Viemeister", semester: "Fall", year: 2002 },
  { name: "Jan Baker", semester: "Fall", year: 2002 },
  { name: "Warren Lehrer", semester: "Fall", year: 2002 },
  { name: "Paul Smith", semester: "Fall", year: 2002 },
  { name: "Martin French", semester: "Fall", year: 2002 },

  // ==================== 2003 ====================
  // Spring 2003
  { name: "Dawn Brown", semester: "Spring", year: 2003 },
  { name: "Terry Evans", semester: "Spring", year: 2003 },
  { name: "Michael Jones McKain", semester: "Spring", year: 2003 },
  { name: "Christy Dersch Schneider", semester: "Spring", year: 2003 },
  { name: "Hal Mayforth", semester: "Spring", year: 2003 },
  { name: "Paul Greenhalgh", semester: "Spring", year: 2003 },

  // Fall 2003
  { name: "Karen Fong", semester: "Fall", year: 2003 },
  { name: "Carl Magnusson", semester: "Fall", year: 2003 },
  { name: "Jhane Barnes", semester: "Fall", year: 2003 },
  { name: "Nicholas Wilton", semester: "Fall", year: 2003 },
  { name: "Charles Lazor", semester: "Fall", year: 2003 },

  // ==================== 2004 ====================
  // Spring 2004
  { name: "Tom Huang & David Brackett & Andrea Herstowski", semester: "Spring", year: 2004 },
  { name: "Gary Griffin", semester: "Spring", year: 2004 },
  { name: "Arthur Gonzales", semester: "Spring", year: 2004 },
  { name: "Jean Orlebeke", semester: "Spring", year: 2004 },
  { name: "Cathy Bleck", semester: "Spring", year: 2004 },
  { name: "Jack Williamson", semester: "Spring", year: 2004 },
  { name: "Joshua C. Chen", semester: "Spring", year: 2004 },

  // Fall 2004
  { name: "Dave Master", semester: "Fall", year: 2004 },
  { name: "Kim Fry", semester: "Fall", year: 2004 },

  // ==================== 2005 ====================
  // Spring 2005
  { name: "Gary Taxali", semester: "Spring", year: 2005 },
  { name: "Mark Murphy", semester: "Spring", year: 2005 },
  { name: "Micah Laaker", semester: "Spring", year: 2005 },
  { name: "Bethanne Knudson", semester: "Spring", year: 2005 },
  { name: "Kim Dickey", semester: "Spring", year: 2005 },
  { name: "Joe Thiel", semester: "Spring", year: 2005 },
  { name: "Myra Mimlitsch", semester: "Spring", year: 2005 },
  { name: "Andreas Hogan", semester: "Spring", year: 2005 },
  { name: "Peter Beasecker", semester: "Spring", year: 2005 },
  { name: "Tom Ockerse", semester: "Spring", year: 2005 },

  // Fall 2005
  { name: "Patricia Belyea", semester: "Fall", year: 2005 },
  { name: "Janice Lessman-Moss", semester: "Fall", year: 2005 },
  { name: "Monica Little & Joe Cecere", semester: "Fall", year: 2005 },
  { name: "John S. Dykes", semester: "Fall", year: 2005 },
  { name: "Robynne Raye", semester: "Fall", year: 2005 },
  { name: "Brady Vest", semester: "Fall", year: 2005 },
  { name: "Glynis Sweeney", semester: "Fall", year: 2005 },

  // ==================== 2006 ====================
  // Spring 2006
  { name: "Jim Shrosbree", semester: "Spring", year: 2006 },
  { name: "Gail Swanlund", semester: "Spring", year: 2006 },
  { name: "Jennifer Sonderby", semester: "Spring", year: 2006 },
  { name: "Joel Nakamura", semester: "Spring", year: 2006 },
  { name: "Donny Rausch", semester: "Spring", year: 2006 },
  { name: "Willi Kunz", semester: "Spring", year: 2006 },
  { name: "Heiner Schmidt", semester: "Spring", year: 2006 },

  // Fall 2006
  { name: "John Hendrix", semester: "Fall", year: 2006 },
  { name: "Yang Xiao Yin", semester: "Fall", year: 2006 },
  { name: "John Cuneo", semester: "Fall", year: 2006 },
  { name: "Kurt Van Dexter", semester: "Fall", year: 2006 },
  { name: "Bazillion Pictures", semester: "Fall", year: 2006 },
  { name: "Denise Gonzales-Crisp", semester: "Fall", year: 2006 },

  // ==================== 2007 ====================
  // Spring 2007
  { name: "Bruce Branit", semester: "Spring", year: 2007 },
  { name: "Karin E. Borke", semester: "Spring", year: 2007 },
  { name: "John Utgaard", semester: "Spring", year: 2007 },
  { name: "Jeff Zwerner", semester: "Spring", year: 2007 },
  { name: "Andreas Hogan", semester: "Spring", year: 2007 },
  { name: "Joe Wood", semester: "Spring", year: 2007 },
  { name: "Craig LaRotonda", semester: "Spring", year: 2007 },
  { name: "Julia Danahey", semester: "Spring", year: 2007 },

  // Fall 2007
  { name: "Brad Sneed", semester: "Fall", year: 2007 },
  { name: "Chris Budd", semester: "Fall", year: 2007 },
  { name: "Marcia Lausen", semester: "Fall", year: 2007 },
  { name: "Lorraine Wild", semester: "Fall", year: 2007 },
  { name: "Jill Bell", semester: "Fall", year: 2007 },
  { name: "Mark Randall", semester: "Fall", year: 2007 },
  { name: "Matt Checkowski", semester: "Fall", year: 2007 },
  { name: "Joe Morse", semester: "Fall", year: 2007 },

  // ==================== 2008 ====================
  // Spring 2008
  { name: "Chuck Owens", semester: "Spring", year: 2008 },
  { name: "Phil Carrizzi", semester: "Spring", year: 2008 },
  { name: "Sean Donahue", semester: "Spring", year: 2008 },
  { name: "Roger Black", semester: "Spring", year: 2008 },
  { name: "Sean Adams", semester: "Spring", year: 2008 },
  { name: "Jerry Bleem", semester: "Spring", year: 2008 },
  { name: "Ann Willoughby", semester: "Spring", year: 2008 },

  // Fall 2008
  { name: "Brian Dougherty", semester: "Fall", year: 2008 },
  { name: "Bruno Monguzzi", semester: "Fall", year: 2008 },
  { name: "Steve Miller", semester: "Fall", year: 2008 },
  { name: "Sharon Werner", semester: "Fall", year: 2008 },
  { name: "Jacob Trollback", semester: "Fall", year: 2008 },
  { name: "Peter Buchanan-Smith", semester: "Fall", year: 2008 },
  { name: "Paul Matthaeus", semester: "Fall", year: 2008 },
  { name: "Emmet Byrne", semester: "Fall", year: 2008 },
  { name: "Jess & Andy Wickstrom", semester: "Fall", year: 2008 },

  // ==================== 2009 ====================
  // Spring 2009
  { name: "Thomas Southall", semester: "Spring", year: 2009 },
  { name: "Jennie Frederick", semester: "Spring", year: 2009 },
  { name: "Travis Millard", semester: "Spring", year: 2009 },

  // Fall 2009
  { name: "Katie Lee & Ian Curry", semester: "Fall", year: 2009 },
  { name: "Simran Sethi", semester: "Fall", year: 2009 },
  { name: "Dorothy Caldwell", semester: "Fall", year: 2009 },

  // ==================== 2010 ====================
  // Spring 2010
  { name: "Sol Sender", semester: "Spring", year: 2010 },
  { name: "Phil Risbeck", semester: "Spring", year: 2010 },
  { name: "Mark Todd & Esther Watson", semester: "Spring", year: 2010 },
  { name: "Scott Thares", semester: "Spring", year: 2010 },
  { name: "Adam Michaels", semester: "Spring", year: 2010 },
  { name: "Sterling Hundley", semester: "Spring", year: 2010 },
  { name: "Roger Wickes", semester: "Spring", year: 2010 },

  // Fall 2010
  { name: "Scott Stowell", semester: "Fall", year: 2010 },
  { name: "Mark Burckhardt", semester: "Fall", year: 2010 },
  { name: "Stephanie Graham", semester: "Fall", year: 2010 },
  { name: "Fredrik Marsh", semester: "Fall", year: 2010 },
  { name: "Julie Beeler", semester: "Fall", year: 2010 },
  { name: "John Bielenberg", semester: "Fall", year: 2010 },

  // ==================== 2011 ====================
  // Spring 2011
  { name: "Yuko Shimizu", semester: "Spring", year: 2011 },
  { name: "Bobby C. Martin", semester: "Spring", year: 2011 },
  { name: "Stephen Johnson", semester: "Spring", year: 2011 },
  { name: "Timmy Fisher", semester: "Spring", year: 2011 },
  { name: "Chris Budd", semester: "Spring", year: 2011 },
  { name: "Randy Olson", semester: "Spring", year: 2011 },
  { name: "Lance Rake", semester: "Spring", year: 2011 },

  // Fall 2011
  { name: "Bryon Darby", semester: "Fall", year: 2011 },
  { name: "Pedro Ayala", semester: "Fall", year: 2011 },
  { name: "Scott Pobiner", semester: "Fall", year: 2011 },
  { name: "Douglas Sellers", semester: "Fall", year: 2011 },
  { name: "Fernanda Cohen", semester: "Fall", year: 2011 },
  { name: "Bruce Dale", semester: "Fall", year: 2011 },
  { name: "Cheryl Towler Weese", semester: "Fall", year: 2011 },

  // ==================== 2012 ====================
  // Spring 2012
  { name: "Kate Bingaman-Burt", semester: "Spring", year: 2012 },
  { name: "Elliott Earls", semester: "Spring", year: 2012 },
  { name: "Jim Moran", semester: "Spring", year: 2012 },
  { name: "Alex Nabaum", semester: "Spring", year: 2012 },
  { name: "Terry Lin", semester: "Spring", year: 2012 },
  { name: "Dawn Hancock", semester: "Spring", year: 2012 },
  { name: "Chuck Fischer", semester: "Spring", year: 2012 },

  // Fall 2012
  { name: "Mark Moskovitz", semester: "Fall", year: 2012 },
  { name: "Jeffrey Taylor", semester: "Fall", year: 2012 },
  { name: "David Hill", semester: "Fall", year: 2012 },
  { name: "Chris + Soojin Buzelli", semester: "Fall", year: 2012 },
  { name: "Frankie Oviedo", semester: "Fall", year: 2012 },
  { name: "Stuart Karten", semester: "Fall", year: 2012 },
  { name: "Terry Evans", semester: "Fall", year: 2012 },

  // ==================== 2013 ====================
  // Spring 2013
  { name: "Tim Hale", semester: "Spring", year: 2013 },
  { name: "Chris Sickels", semester: "Spring", year: 2013 },
  { name: "Mike Sinclair", semester: "Spring", year: 2013 },
  { name: "Sarah Foelske", semester: "Spring", year: 2013 },
  { name: "Alec Soth", semester: "Spring", year: 2013 },
  { name: "Dan Cassaro", semester: "Spring", year: 2013 },
  { name: "Brandon Murphy", semester: "Spring", year: 2013 },

  // Fall 2013
  { name: "John Bielenberg", semester: "Fall", year: 2013 },
  { name: "Timothy Archibald", semester: "Fall", year: 2013 },
  { name: "Joachim Schmid", semester: "Fall", year: 2013 },
  { name: "Marshall Rake", semester: "Fall", year: 2013 },
  { name: "Emily Martin", semester: "Fall", year: 2013 },
  { name: "Gary Locke", semester: "Fall", year: 2013 },

  // ==================== 2014 ====================
  // Spring 2014
  { name: "Richard Downes", semester: "Spring", year: 2014 },
  { name: "Angela MonDragon & Matt George", semester: "Spring", year: 2014 },
  { name: "Tim Hossler", semester: "Spring", year: 2014 },
  { name: "Matthew Shlian", semester: "Spring", year: 2014 },
  { name: "Ben Livingston", semester: "Spring", year: 2014 },
  { name: "Dawn Brown", semester: "Spring", year: 2014 },
  { name: "Mark Klett", semester: "Spring", year: 2014 },

  // Fall 2014
  { name: "James Koval", semester: "Fall", year: 2014 },
  { name: "Matthias Pliessnig", semester: "Fall", year: 2014 },
  { name: "Erik Marinovich", semester: "Fall", year: 2014 },
  { name: "Rania Matar", semester: "Fall", year: 2014 },
  { name: "Bill Carman", semester: "Fall", year: 2014 },
  { name: "Ben Ferencz", semester: "Fall", year: 2014 },
  { name: "Vivian Beer", semester: "Fall", year: 2014 },
  { name: "Lori Nix", semester: "Fall", year: 2014 },

  // ==================== 2015 ====================
  // Spring 2015
  { name: "Julie Blackmon", semester: "Spring", year: 2015 },
  { name: "Tom Shields", semester: "Spring", year: 2015 },
  { name: "Ryan Clifford", semester: "Spring", year: 2015 },
  { name: "Greg Manchess", semester: "Spring", year: 2015 },
  { name: "David Emitt Adams", semester: "Spring", year: 2015 },
  { name: "Studio Eight Hour Day", semester: "Spring", year: 2015 },

  // Fall 2015
  { name: "Matt Chase", semester: "Fall", year: 2015 },
  { name: "Dietmar Gotzelmann", semester: "Fall", year: 2015 },
  { name: "Bill Mayer", semester: "Fall", year: 2015 },
  { name: "Deborah Luster", semester: "Fall", year: 2015 },
  { name: "Rania Matar", semester: "Fall", year: 2015 },
  { name: "Design Egg", semester: "Fall", year: 2015 },
  { name: "Ian Gonsher", semester: "Fall", year: 2015 },

  // ==================== 2016 ====================
  // Spring 2016
  { name: "Timmy Fisher", semester: "Spring", year: 2016 },
  { name: "Aaron Draplin", semester: "Spring", year: 2016 },
  { name: "Arno Minkkinen", semester: "Spring", year: 2016 },
  { name: "Adam Henry", semester: "Spring", year: 2016 },
  { name: "Noah Scalin", semester: "Spring", year: 2016 },
  { name: "Keith Negley", semester: "Spring", year: 2016 },
  { name: "Silvia Ros", semester: "Spring", year: 2016 },

  // Fall 2016
  { name: "John Bielenberg", semester: "Fall", year: 2016 },
  { name: "Jamie Koval", semester: "Fall", year: 2016 },
  { name: "Read Worth", semester: "Fall", year: 2016 },
  { name: "Jeffrey Thompson", semester: "Fall", year: 2016 },
  { name: "Design Disruptors", semester: "Fall", year: 2016 },
  { name: "Greg Castillo", semester: "Fall", year: 2016 },
  { name: "David Plunkert", semester: "Fall", year: 2016 },
  { name: "Silvia Rosenthal", semester: "Fall", year: 2016 },
  { name: "Reed Hansuld", semester: "Fall", year: 2016 },

  // ==================== 2017 ====================
  // Spring 2017
  { name: "Louisa Bertman", semester: "Spring", year: 2017 },
  { name: "David Hilliard", semester: "Spring", year: 2017 },
  { name: "Natalie Krick", semester: "Spring", year: 2017 },
  { name: "Jon Sueda", semester: "Spring", year: 2017 },
  { name: "David Chung", semester: "Spring", year: 2017 },
  { name: "Mark Moskovitz", semester: "Spring", year: 2017 },
  { name: "Elise Kirk", semester: "Spring", year: 2017 },

  // Fall 2017
  { name: "Richard & Vicky Hansen", semester: "Fall", year: 2017 },
  { name: "Dana Fritz", semester: "Fall", year: 2017 },
  { name: "Bob Ebendorf", semester: "Fall", year: 2017 },
  { name: "Eric Heiman", semester: "Fall", year: 2017 },
  { name: "Andy Beall", semester: "Fall", year: 2017 },
  { name: "Rafael Marin", semester: "Fall", year: 2017 },
  { name: "Justin Kimball", semester: "Fall", year: 2017 },

  // ==================== 2018 ====================
  // Spring 2018
  { name: "Andrew Blauvelt", semester: "Spring", year: 2018 },
  { name: "Troy Scillian", semester: "Spring", year: 2018 },
  { name: "Emily Pilloton", semester: "Spring", year: 2018 },
  { name: "RaMell Ross", semester: "Spring", year: 2018 },
  { name: "Lindsey Yankey", semester: "Spring", year: 2018 },
  { name: "Matt Wegerer", semester: "Spring", year: 2018 },
  { name: "Louisa Bertman", semester: "Spring", year: 2018 },

  // Fall 2018
  { name: "Ben Barry", semester: "Fall", year: 2018 },
  { name: "Lauren Greenfield", semester: "Fall", year: 2018 },
  { name: "John Stamos", semester: "Fall", year: 2018 },

  // ==================== 2019 ====================
  // Spring 2019
  { name: "Paul Sahre", semester: "Spring", year: 2019 },
  { name: "Christian Helms", semester: "Spring", year: 2019 },
  { name: "Jennifer Morla", semester: "Spring", year: 2019 },
  { name: "Priya Kambli", semester: "Spring", year: 2019 },
  { name: "Lisk Feng", semester: "Spring", year: 2019 },
  { name: "Michael Braley", semester: "Spring", year: 2019 },
  { name: "Steven B. Smith", semester: "Spring", year: 2019 },
  { name: "Rob Forbes", semester: "Spring", year: 2019 },
  { name: "Hoss Haley & Andrew Hayes", semester: "Spring", year: 2019 },
  { name: "Felipe Rocha", semester: "Spring", year: 2019 },
  { name: "Donny Rausch", semester: "Spring", year: 2019 },
  { name: "Anthony Kramer", semester: "Spring", year: 2019 },

  // Fall 2019
  { name: "Cat Coquillette", semester: "Fall", year: 2019 },
  { name: "Scott Starrett", semester: "Fall", year: 2019 },
  { name: "Tucker Trotter", semester: "Fall", year: 2019 },
  { name: "Alisa Wolfson", semester: "Fall", year: 2019 },
  { name: "Jolby & Friends", semester: "Fall", year: 2019 },
  { name: "Zora Murff", semester: "Fall", year: 2019 },
  { name: "Stanley Hainsworth", semester: "Fall", year: 2019 },

  // ==================== 2020 ====================
  // Spring 2020
  { name: "Paul King", semester: "Spring", year: 2020 },
  { name: "Kelli Anderson", semester: "Spring", year: 2020 },
  { name: "Drew Voegele", semester: "Spring", year: 2020 },
  { name: "Jenn Ely", semester: "Spring", year: 2020 },
  { name: "Kris Graves", semester: "Spring", year: 2020 },
  { name: "Lissa Rivera", semester: "Spring", year: 2020 },
  { name: "Alejandro Cartagena", semester: "Spring", year: 2020 },

  // Fall 2020
  { name: "Andy Pizza", semester: "Fall", year: 2020 },
  { name: "Paul King", semester: "Fall", year: 2020 },
  { name: "Paul Conrad", semester: "Fall", year: 2020 },
  { name: "Kelli Anderson", semester: "Fall", year: 2020 },
  { name: "Drew Voegele", semester: "Fall", year: 2020 },
  { name: "Jenn Ely", semester: "Fall", year: 2020 },
  { name: "Kris Graves", semester: "Fall", year: 2020 },
  { name: "Bil Donovan", semester: "Fall", year: 2020 },

  // ==================== 2021 ====================
  // Spring 2021
  { name: "Alexis Du Mond Puchek", semester: "Spring", year: 2021 },
  { name: "Geoffrey Holstad", semester: "Spring", year: 2021 },
  { name: "Meg Lewis", semester: "Spring", year: 2021 },
  { name: "Farah Al Qasimi", semester: "Spring", year: 2021 },
  { name: "Jennifer Daniel", semester: "Spring", year: 2021 },
  { name: "Susan Sokolowski", semester: "Spring", year: 2021 },
  { name: "Heather Brantman Torpey", semester: "Spring", year: 2021 },

  // Fall 2021
  { name: "Marshall Vandruff", semester: "Fall", year: 2021 },
  { name: "ClayVon Lowe", semester: "Fall", year: 2021 },
  { name: "Daniel Wong", semester: "Fall", year: 2021 },
  { name: "Rob Smigielski", semester: "Fall", year: 2021 },
  { name: "Diana Markosian", semester: "Fall", year: 2021 },
  { name: "Rodrigo Valenzuela", semester: "Fall", year: 2021 },
  { name: "Liz Jackson & Alex Haagaard", semester: "Fall", year: 2021 },

  // ==================== 2022 ====================
  // Spring 2022
  { name: "Lea Stewart", semester: "Spring", year: 2022 },
  { name: "Brian Stauffer", semester: "Spring", year: 2022 },
  { name: "Stephen Hassard", semester: "Spring", year: 2022 },
  { name: "Jason Keenan", semester: "Spring", year: 2022 },
  { name: "Tarrah Krajnak", semester: "Spring", year: 2022 },
  { name: "Yuko Shimizu", semester: "Spring", year: 2022 },

  // Fall 2022
  { name: "Marshall Vandruff", semester: "Fall", year: 2022 },
  { name: "Gina Osterloh", semester: "Fall", year: 2022 },
  { name: "ClayVon Lowe", semester: "Fall", year: 2022 },
  { name: "Daniel Wong", semester: "Fall", year: 2022 },
  { name: "Rob Smigielski", semester: "Fall", year: 2022 },
  { name: "Diana Markosian", semester: "Fall", year: 2022 },
  { name: "Rodrigo Valenzuela", semester: "Fall", year: 2022 },
  { name: "Liz Jackson & Alex Haagaard", semester: "Fall", year: 2022 },

  // ==================== 2023 ====================
  // Spring 2023
  { name: "Hallmark Designer Panel", semester: "Spring", year: 2023 },
  { name: "Janelle 'Longanisa' Quibuyen", semester: "Spring", year: 2023 },
  { name: "Donny Rausch", semester: "Spring", year: 2023 },
  { name: "Pixy Liao", semester: "Spring", year: 2023 },
  { name: "Gabriele Fumero", semester: "Spring", year: 2023 },

  // Fall 2023
  { name: "Shawn Brackbill", semester: "Fall", year: 2023 },
  { name: "Kris Kuksi", semester: "Fall", year: 2023 },
  { name: "John Hendrix", semester: "Fall", year: 2023 },
  { name: "April Starr", semester: "Fall", year: 2023 },
  { name: "Ashley Teamer", semester: "Fall", year: 2023 },
  { name: "Rob Saunders", semester: "Fall", year: 2023 },
  { name: "Stephanie Anh", semester: "Fall", year: 2023 },
  { name: "Jason Decker", semester: "Fall", year: 2023 },

  // ==================== 2024 ====================
  // Spring 2024
  { name: "Angela Sung", semester: "Spring", year: 2024 },
  { name: "Spandita Malik", semester: "Spring", year: 2024 },
  { name: "Polymode Studio", semester: "Spring", year: 2024 },
  { name: "Harlan Bozeman", semester: "Spring", year: 2024 },
  { name: "Frank Norton", semester: "Spring", year: 2024 },
  { name: "Alan Tipp", semester: "Spring", year: 2024 },
  { name: "Travis Millard", semester: "Spring", year: 2024 },

  // Fall 2024
  { name: "Colie Wertz", semester: "Fall", year: 2024 },
  { name: "Sarah Bryant", semester: "Fall", year: 2024 },
  { name: "Bona Bones", semester: "Fall", year: 2024 },
  { name: "Brad Woodard", semester: "Fall", year: 2024 },
  { name: "Steven Weinberg", semester: "Fall", year: 2024 },
  { name: "Matt Lehman", semester: "Fall", year: 2024 },
  { name: "John F. Malta", semester: "Fall", year: 2024 },

  // ==================== 2025 ====================
  // Spring 2025
  { name: "Jacob Crawford", semester: "Spring", year: 2025 },
  { name: "Chad Hutson", semester: "Spring", year: 2025 },
  { name: "Adam Ekberg", semester: "Spring", year: 2025 },
  { name: "Chad W. Beckerman", semester: "Spring", year: 2025 },
  { name: "Kelli Connell", semester: "Spring", year: 2025 },
  { name: "Dan Padavic", semester: "Spring", year: 2025 },
  { name: "Jeff Breazeale", semester: "Spring", year: 2025 },

  // Fall 2025
  { name: "Tad Carpenter", semester: "Fall", year: 2025 },
  { name: "Aggie Toppins", semester: "Fall", year: 2025 },
  { name: "Titus Smith", semester: "Fall", year: 2025 },

  // ==================== 2026 ====================
  // Spring 2026
  { name: "Adam Henry", semester: "Spring", year: 2026 },
  { name: "Jeremy Vickery", semester: "Spring", year: 2026 },
  { name: "Wesley Bedrosian", semester: "Spring", year: 2026 },
  { name: "JD Hooge", semester: "Spring", year: 2026 },
  { name: "Nicolas Thetard", semester: "Spring", year: 2026 },
  { name: "Jen White-Johnson", semester: "Spring", year: 2026 },
  { name: "Matthias Pliessnig", semester: "Spring", year: 2026 },
  { name: "Kellie Walters", semester: "Spring", year: 2026 },
  { name: "Nelson Chan", semester: "Spring", year: 2026 },
  { name: "Rebecca Gilbert", semester: "Spring", year: 2026 },
];

// Canonical count from cross-referenced sources (KU ArcD, Andrea Herstowski, Barry Fitzgerald, LJWorld)
export const ALL_TIME_LECTURE_COUNT = 570;
