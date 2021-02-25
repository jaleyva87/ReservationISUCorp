using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationProject.Interfaces;
using ReservationProject.Models;
using Microsoft.EntityFrameworkCore;

namespace ReservationProject.Data
{
  public class ContactDataAccessLayer : IContact
  {
      private ReservationContext db;
      public ContactDataAccessLayer(ReservationContext _db)
      {
        db = _db;
      }

    public IEnumerable<Contact> GetAllContacts()
      {
        try
        {
          return db.Contacts.ToList();
        }
        catch
        {
          throw;
        }
      }

      //To Add new contact record   
      public int AddContact(Contact _contact)
      {
        try
        {
          db.Contacts.Add(_contact);
          db.SaveChanges();
          return 1;
        }
        catch
        {
          throw new Exception("This is a custom exception");
        }
      }

      //To Update the records of a particular contact
      public int UpdateContact(Contact _contact)
      {
        try
        {
          db.Entry(_contact).State = EntityState.Modified;
          db.SaveChanges();

          return 1;
        }
        catch
        {
          throw;
        }
      }

      //Get the details of a particular contact  
      public Contact GetContactData(string name)
      {
        try
        {
          Contact _contact = db.Contacts.Find(name);
          return _contact;
        }
        catch
        {
          throw;
        }
      }

      //To Delete the record of a particular contact
      public int DeleteContact(string name)
      {
        try
        {
          Contact _contact = db.Contacts.Find(name);
          db.Contacts.Remove(_contact);
          db.SaveChanges();
          return 1;
        }
        catch
        {
          throw;
        }
      }

      //To Get the list of Reservation
      public List<Reservation> GetReservations()
      {
        List<Reservation> listReservations = new List<Reservation>();
        listReservations = (from Reservation in db.Reservations select Reservation).ToList();

        return listReservations;
      }
    }
}
