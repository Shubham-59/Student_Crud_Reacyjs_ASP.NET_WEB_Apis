using ASPCoreWebApi.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ASPCoreWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ASPCoreWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAPIController : ControllerBase
    {
        private readonly SchoolContext _db;

        public StudentAPIController(SchoolContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudent()
        {
            var studentData = await _db.Students.ToListAsync();
            return Ok(studentData);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudentById(int id)
        {
            var studentById = await _db.Students.FindAsync(id);
            if (studentById == null)
            {

                return NotFound();
            }
            return Ok(studentById);
        }
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudentData(Student st)
        {
            await _db.Students.AddAsync(st);
            await _db.SaveChangesAsync();
            return Ok(st);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> UpdateStudentInfo(int id, Student st)
        {
            if (id != st.Id)
            {
                return BadRequest();
            }
            _db.Entry(st).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return Ok(st);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> DeleteStudentData(int id)
        {
            var stu = await _db.Students.FindAsync(id);
            if (stu == null) {
                return NotFound();

            }
            _db.Students.Remove(stu);
            await _db.SaveChangesAsync();
            return Ok();
        }
    } }