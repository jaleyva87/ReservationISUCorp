using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationProject.Models;

namespace ReservationProject.Interfaces
{
   public interface IReservation
    {
      IEnumerable<Reservation> GetAllReservations();
      int AddReservation(Reservation _reservation);
      int UpdateReservation(Reservation _reservation);
      Reservation GetReservationData(int _id);
      int DeleteReservation(int _id);
   }
}
