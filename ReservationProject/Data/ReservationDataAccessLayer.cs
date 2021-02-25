using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationProject.Interfaces;
using ReservationProject.Models;
using Microsoft.EntityFrameworkCore;

namespace ReservationProject.Data
{
  public class ReservationDataAccessLayer : IReservation
  {
    private ReservationContext db;
    public ReservationDataAccessLayer(ReservationContext _db)
    {
      db = _db;
    }

    public IEnumerable<Reservation> GetAllReservations()
    {
      try
      {
        return db.Reservations.ToList();
      }
      catch
      {
        throw;
      }
    }

    //To Add new reservation record   
    public int AddReservation(Reservation _reservation)
    {
      try
      {
        db.Reservations.Add(_reservation);
        db.SaveChanges();
        return 1;
      }
      catch
      {
        throw new Exception("This is a custom exception");
      }
    }

    //To Update the records of a particular reservation
    public int UpdateReservation(Reservation _reservation)
    {
      try
      {
        db.Entry(_reservation).State = EntityState.Modified;
        db.SaveChanges();

        return 1;
      }
      catch
      {
        throw;
      }
    }

    //Get the details of a particular reservation 
    public Reservation GetReservationData(int id)
    {
      try
      {
        Reservation _reservation = db.Reservations.Find(id);
        return _reservation;
      }
      catch
      {
        throw;
      }
    }

    //To Delete the record of a particular reservation
    public int DeleteReservation(int id)
    {
      try
      {
        Reservation _reservation = db.Reservations.Find(id);
        db.Reservations.Remove(_reservation);
        db.SaveChanges();
        return 1;
      }
      catch
      {
        throw;
      }
    }

  }
}
