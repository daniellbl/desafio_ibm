using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace desafio_backend.Models
{
    public class UserDto
    {
        public UserDto() { }
        public UserDto(User user)
        {
            Id = user.Id;
            Name = user.Name;
            BirthDate = user.BirthDate;
            Email = user.Email;
            Password = user.Password;
            Cpf = user.Cpf;
            UserType = user.UserType;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Cpf { get; set; }
        public int UserType { get; set; }
    }
}
