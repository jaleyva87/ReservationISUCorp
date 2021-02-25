using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReservationProject.Models
{
  /**This is the Contact Model class**/

  public class Contact
  {
    [Key]
    [Column(Order = 0)]
    [Required]
    public string Name { get; set; }
    [Required]
    public int Contacttype { get; set; }
    public int Phone { get; set; }
    [Required]
    public DateTime Birthdate { get; set; }

    [ForeignKey("ID")]
    public ICollection<Reservation> Reservations { get; set; }
  }
}
