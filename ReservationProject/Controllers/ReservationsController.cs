using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationProject.Data;
using ReservationProject.Models;
using ReservationProject.Interfaces;

namespace ReservationProject.Controllers
{
  [ApiController]
  [Route("api/reservation-list")]
  [Produces("application/json")]
  public class ReservationsController : Controller
    {
       private readonly IReservation ireservation;
       public ReservationsController(IReservation _ireservation)
       { 
         ireservation = _ireservation;
       }

       // GET: api/Reservations
    [HttpGet]
    public IEnumerable<Reservation> Index()
       {
         IEnumerable < Reservation > thisone = ireservation.GetAllReservations();
         return thisone;
       }

      [HttpPost]
      [Route("Create")]
      public int Create([FromBody] Reservation reservation)
      {
        try
        {

          return ireservation.AddReservation(reservation);

        }
        catch
        {
          throw;
        }
      }

      [HttpGet]
      [Route("Details/{id}")]
      public Reservation Details(int id)
      {
        return ireservation.GetReservationData(id);
      }

      [HttpPut]
      [Route("Edit")]
      public int Edit([FromBody]Reservation reservation)
      {
        return ireservation.UpdateReservation(reservation);
      }

      [HttpDelete]
      [Route("Delete/{id}")]
      public int Delete(int id)
      {
        return ireservation.DeleteReservation(id);
      }

  }
}
