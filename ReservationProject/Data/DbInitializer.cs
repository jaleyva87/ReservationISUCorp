using ReservationProject.Models;
using System;
using System.Linq;

namespace ReservationProject.Data
{
  public static class DbInitializer
  {
    public static void Initialize(ReservationContext context)
    {
      bool _iscreated = context.Database.EnsureCreated();

      //--Looking for any Contact Data
      if (context.Contacts.Any())
      {
        return;   // DB has been seeded
      }

      var contacts = new Contact[]
      {
        //---Im using Cuban Phone Format 
            new Contact{Name="Anna",Contacttype=1, Phone=54869532,Birthdate=DateTime.Parse("1987-09-07")},
            new Contact{Name="Jhon",Contacttype=1, Phone=54869599,Birthdate=DateTime.Parse("2002-03-11")},
            new Contact{Name="Frank",Contacttype=3,Phone=56113343,Birthdate=DateTime.Parse("2010-01-13")},
            new Contact{Name="Robert",Contacttype=1, Phone=55693256,Birthdate=DateTime.Parse("1968-01-22")},
            new Contact{Name="Jessica",Contacttype=3, Phone=52963258,Birthdate=DateTime.Parse("1978-01-01")},
            new Contact{Name="Tom Cover",Contacttype=2, Phone=53748910,Birthdate=DateTime.Parse("2015-02-28")},
            new Contact{Name="Brad",Contacttype=2, Phone=55025896,Birthdate=DateTime.Parse("2001-10-9")},
            new Contact{Name="Leonard",Contacttype=1, Phone=575621255,Birthdate=DateTime.Parse("2009-08-11")}
      };
      foreach (Contact s in contacts)
      {
        context.Contacts.Add(s);
      }
      context.SaveChanges();

      var reservations = new Reservation[]
      {
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=1,Favorite=true,ContactName="Tom Cover"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=5,Favorite=true,ContactName="Tom Cover"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=4,Favorite=false,ContactName="Leonard"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=2,Favorite=true,ContactName="Brad"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=3,Favorite=true,ContactName="Jessica"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=4,Favorite=false,ContactName="Anna"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=0,Favorite=false,ContactName="Anna"},
            new Reservation{PlaceReserv="Bayamo City",Datereserv=DateTime.Parse("2009-08-11"),Ranking=1,Favorite=false,ContactName="Anna"}
      };
      foreach (Reservation e in reservations)
      {
        context.Reservations.Add(e);
      }
      context.SaveChanges();
    }
  }
}
