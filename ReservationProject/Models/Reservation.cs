using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

/**This is the Reservation Model Class**/
namespace ReservationProject.Models
{
  public class Reservation
  {
    [Key]
    [Column(Order = 0)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   // auto-incrementing feature
    public int ID { get; set; }
    [Required]
    public string PlaceReserv { get; set; }
    [Required]
    public DateTime Datereserv { get; set; }
    public int Ranking { get; set; }
    public bool Favorite { get; set; }

    [ForeignKey("Name")]
    public string ContactName { get; set; }
    
 //   public Contact Contacts { get; set; }
  }
}
