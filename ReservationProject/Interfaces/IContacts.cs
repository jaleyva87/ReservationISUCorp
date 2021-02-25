using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationProject.Models;

namespace ReservationProject.Interfaces
{
  public interface IContact
  {
    IEnumerable<Contact> GetAllContacts();
    int AddContact(Contact _contact);
    int UpdateContact(Contact _contact);
    Contact GetContactData(string _name);
    int DeleteContact(string _name);
    List<Reservation> GetReservations();

  }
}
