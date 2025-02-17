from django.test import TestCase
from .tests import ViewsTestCase

# filepath: /C:/Users/HungVu/Desktop/dental-system/dental/users/test_tests.py

class ViewsTestCaseTests(TestCase):
  def setUp(self):
    self.test_case = ViewsTestCase()
    self.test_case.setUp()

  def test_home_view(self):
    self.test_case.test_home_view()

  def test_courses_view(self):
    self.test_case.test_courses_view()

  def test_edit_course_view(self):
    self.test_case.test_edit_course_view()

  def test_delete_course_view(self):
    self.test_case.test_delete_course_view()

  def test_students_view(self):
    self.test_case.test_students_view()

  def test_student_edit_view(self):
    self.test_case.test_student_edit_view()

  def test_student_delete_view(self):
    self.test_case.test_student_delete_view()

  def test_student_new_view(self):
    self.test_case.test_student_new_view()

  def test_course_new_view(self):
    self.test_case.test_course_new_view()