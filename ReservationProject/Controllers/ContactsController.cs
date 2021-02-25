using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationProject.Data;
using ReservationProject.Models;
using ReservationProject.Interfaces;

namespace ReservationProject.Controllers
{

  [ApiController]
  [Route("api/contacts-crud")]
  public class ContactsController : Controller
  {
    private readonly IContact icontact;

    public ContactsController(IContact _icontact)
    {
      icontact = _icontact;
    }

    [HttpGet]
    public IEnumerable<Contact> Index()
    {
      return icontact.GetAllContacts();
    }

    [HttpPost]
    [Route("Create")]
    public int Create([FromBody] Contact contact)
    {
      try
      {
     
        return icontact.AddContact(contact);

      }
      catch
      {
        throw;
      }
    }

    [HttpGet]
    [Route("Details/{name}")]
    public Contact Details(string name)
    {
      return icontact.GetContactData(name);
    }

    [HttpPut]
    [Route("Edit")]
    public int Edit([FromBody]Contact contact)
    {
      return icontact.UpdateContact(contact);
    }

    [HttpDelete]
    [Route("Delete/{name}")]
    public int Delete(string name)
    {
      return icontact.DeleteContact(name);
    }
    
  }
}

